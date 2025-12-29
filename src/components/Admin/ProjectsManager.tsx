import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects, createProject, updateProject, deleteProject, clearError } from '../../store/slices/projectsSlice';
import api from '../../utils/api';

function ProjectsManager() {
  const dispatch = useAppDispatch();
  const { items: projects, loading, error } = useAppSelector((state) => state.projects);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    images: [],
    youtubeVideo: '',
    github: '',
    demo: '',
    features: ''
  });
  const [uploading, setUploading] = useState(false);
  const [uploadingMultiple, setUploadingMultiple] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleFileUpload = async (e, isMain = true) => {
    const file = e.target.files[0];
    if (!file) return;

    // Проверка лимита для дополнительных изображений
    if (!isMain && formData.images && formData.images.length >= 10) {
      alert('Максимальное количество дополнительных изображений: 10');
      return;
    }

    if (isMain) {
      setUploading(true);
    } else {
      setUploadingMultiple(true);
    }

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.fullUrl || 
        `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8081'}${response.data.url}`;
      
      if (isMain) {
        setFormData({ ...formData, image: imageUrl });
      } else {
        setFormData({ ...formData, images: [...formData.images, imageUrl] });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка загрузки файла');
    } finally {
      if (isMain) {
        setUploading(false);
      } else {
        setUploadingMultiple(false);
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.title.trim()) {
      alert('Пожалуйста, укажите название проекта');
      return;
    }
    
    if (!formData.description || !formData.description.trim()) {
      alert('Пожалуйста, укажите описание проекта');
      return;
    }
    
    if (!formData.image || !formData.image.trim()) {
      alert('Пожалуйста, укажите URL изображения или загрузите файл');
      return;
    }

    const imageUrl = formData.image.trim();
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://') && !imageUrl.startsWith('/')) {
      alert('URL изображения должен начинаться с http://, https:// или /');
      return;
    }

    let technologiesArray = [];
    if (formData.technologies && formData.technologies.trim()) {
      technologiesArray = formData.technologies
        .split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);
    }

    let featuresArray = [];
    if (formData.features && formData.features.trim()) {
      featuresArray = formData.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);
    }

    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      technologies: technologiesArray,
      image: formData.image.trim(),
      images: formData.images || [],
      youtubeVideo: formData.youtubeVideo?.trim() || '',
      github: formData.github?.trim() || '',
      demo: formData.demo?.trim() || '',
      features: featuresArray
    };

    try {
      if (editingProject) {
        await dispatch(updateProject({ id: editingProject._id, projectData })).unwrap();
      } else {
        await dispatch(createProject(projectData)).unwrap();
      }

      setShowModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        technologies: '',
        image: '',
        images: [],
        youtubeVideo: '',
        github: '',
        demo: '',
        features: ''
      });
      dispatch(fetchProjects());
    } catch (error) {
      alert(`Ошибка сохранения проекта\n\nДетали: ${error}`);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies?.join(', ') || '',
      image: project.image || '',
      images: project.images || [],
      youtubeVideo: project.youtubeVideo || '',
      github: project.github || '',
      demo: project.demo || '',
      features: project.features?.join(', ') || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;

    try {
      await dispatch(deleteProject(id)).unwrap();
      dispatch(fetchProjects());
    } catch (error) {
      alert(`Ошибка удаления проекта: ${error}`);
    }
  };

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Управление проектами</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setFormData({
              title: '',
              description: '',
              technologies: '',
              image: '',
              images: [],
              youtubeVideo: '',
              github: '',
              demo: '',
              features: ''
            });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Добавить проект
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="text-gray-400 col-span-full text-center py-8">
            Проекты не найдены
          </div>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="bg-gray-800 rounded-lg p-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="flex-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingProject ? 'Редактировать проект' : 'Добавить проект'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Название</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Описание</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Технологии (через запятую)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Основное изображение</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-2"
                  disabled={uploading}
                />
                {uploading && <p className="text-blue-400 text-sm">Загрузка...</p>}
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mt-2"
                  placeholder="Или введите URL изображения"
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                )}
              </div>
              
              {/* Дополнительные изображения */}
              <div>
                <label className="block text-gray-300 mb-2">
                  Дополнительные изображения
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, false)}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-2"
                  disabled={uploadingMultiple}
                />
                {uploadingMultiple && <p className="text-blue-400 text-sm mb-2">Загрузка...</p>}
                
                {formData.images && formData.images.length > 0 && (
                  <div className="mt-2">
                    <p className="text-gray-400 text-sm mb-2">
                      Загружено изображений: {formData.images.length} / 10
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {formData.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img src={img} alt={`Additional ${index + 1}`} className="w-full h-24 object-cover rounded" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {formData.images && formData.images.length >= 10 && (
                  <p className="text-yellow-400 text-sm mt-2">
                    Достигнут максимум изображений (10)
                  </p>
                )}
              </div>

              {/* YouTube видео */}
              <div>
                <label className="block text-gray-300 mb-2">
                  YouTube видео (ссылка)
                </label>
                <input
                  type="url"
                  value={formData.youtubeVideo}
                  onChange={(e) => setFormData({ ...formData, youtubeVideo: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                {formData.youtubeVideo && (
                  <p className="text-gray-400 text-sm mt-1">
                    Вставьте ссылку на YouTube видео
                  </p>
                )}
              </div>

              <div>
                <label className="block text-gray-300 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Demo URL</label>
                <input
                  type="url"
                  value={formData.demo}
                  onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Особенности (через запятую)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  rows="3"
                  placeholder="Feature 1, Feature 2, Feature 3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {editingProject ? 'Обновить' : 'Создать'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProject(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectsManager;
