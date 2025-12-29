import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchSkills, createSkill, updateSkill, deleteSkill, clearError } from '../../store/slices/skillsSlice';

function SkillsManager() {
  const dispatch = useAppDispatch();
  const { items: skills, loading, error } = useAppSelector((state) => state.skills);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    items: '',
    order: 0
  });

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const skillData = {
        ...formData,
        items: formData.items.split(',').map(item => item.trim()).filter(item => item),
        order: parseInt(formData.order) || 0
      };

      if (editingSkill) {
        await dispatch(updateSkill({ id: editingSkill._id, skillData })).unwrap();
      } else {
        await dispatch(createSkill(skillData)).unwrap();
      }

      setShowModal(false);
      setEditingSkill(null);
      setFormData({ category: '', title: '', items: '', order: 0 });
      dispatch(fetchSkills());
    } catch (error) {
      alert(`Ошибка сохранения навыка: ${error}`);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      category: skill.category,
      title: skill.title,
      items: skill.items?.join(', ') || '',
      order: skill.order || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить этот навык?')) return;

    try {
      await dispatch(deleteSkill(id)).unwrap();
      dispatch(fetchSkills());
    } catch (error) {
      alert(`Ошибка удаления навыка: ${error}`);
    }
  };

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Управление навыками</h1>
        <button
          onClick={() => {
            setEditingSkill(null);
            setFormData({ category: '', title: '', items: '', order: 0 });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Добавить навык
        </button>
      </div>

      <div className="space-y-4">
        {skills.length === 0 ? (
          <div className="text-gray-400 text-center py-8">Навыки не найдены</div>
        ) : (
          skills.map((skill) => (
            <div key={skill._id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{skill.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">Категория: {skill.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {skill.items?.map((item, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-400 rounded text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingSkill ? 'Редактировать навык' : 'Добавить навык'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Категория</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  required
                />
              </div>
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
                <label className="block text-gray-300 mb-2">Навыки (через запятую)</label>
                <textarea
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  rows="4"
                  placeholder="React, TypeScript, JavaScript"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Порядок</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  {editingSkill ? 'Обновить' : 'Создать'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingSkill(null);
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

export default SkillsManager;
