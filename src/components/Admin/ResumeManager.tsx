import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchResume, updateResume, clearError } from '../../store/slices/resumeSlice';
import api from '../../utils/api';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';

function ResumeManager() {
  const dispatch = useAppDispatch();
  const { file, fileUrl, externalLink, loading, error } = useAppSelector((state) => state.resume);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    file: '',
    fileUrl: '',
    externalLink: ''
  });

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  useEffect(() => {
    setFormData({
      file: file || '',
      fileUrl: fileUrl || '',
      externalLink: externalLink || ''
    });
  }, [file, fileUrl, externalLink]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      const response = await api.post('/upload-document', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileUrl = response.data.fullUrl || 
        `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8081'}${response.data.url}`;
      
      setFormData({ ...formData, file: fileUrl, fileUrl: fileUrl });
      alert('Файл успешно загружен!');
    } catch (error) {
      console.error('Error uploading file:', error);
      let errorMessage = 'Ошибка загрузки файла';
      
      if (error.response) {
        errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Сервер не отвечает. Проверьте, запущен ли сервер.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      alert(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateResume(formData)).unwrap();
      alert('Резюме успешно сохранено!');
      dispatch(fetchResume());
    } catch (error) {
      alert(`Ошибка сохранения резюме: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Управление резюме</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        {/* Загрузка файла резюме */}
        <div>
          <label className="block text-gray-300 mb-2">Файл резюме (PDF, DOC, DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mb-2"
            disabled={uploading}
          />
          {uploading && <p className="text-blue-400 text-sm mb-2">Загрузка...</p>}
          
          {formData.file && (
            <div className="mt-2 flex items-center gap-2">
              <FaFilePdf className="text-red-500" />
              <a
                href={formData.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Просмотреть загруженный файл
              </a>
            </div>
          )}
        </div>

        {/* Или URL файла */}
        <div>
          <label className="block text-gray-300 mb-2">Или URL файла резюме</label>
          <input
            type="url"
            value={formData.fileUrl}
            onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            placeholder="https://example.com/resume.pdf"
          />
        </div>

        {/* Внешняя ссылка на резюме */}
        <div>
          <label className="block text-gray-300 mb-2">Внешняя ссылка на резюме</label>
          <input
            type="url"
            value={formData.externalLink}
            onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            placeholder="https://linkedin.com/in/your-profile"
          />
          <p className="text-gray-400 text-sm mt-1">
            Ссылка на резюме на внешнем сервисе (LinkedIn, Google Drive и т.д.)
          </p>
        </div>

        {/* Кнопка сохранения */}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>

        {/* Информация */}
        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg">
          <p className="text-gray-300 text-sm">
            <strong>Приоритет отображения:</strong>
          </p>
          <ol className="text-gray-400 text-sm mt-2 space-y-1 list-decimal list-inside">
            <li>Если загружен файл или указан URL файла - будет показана кнопка "Скачать резюме"</li>
            <li>Если указана внешняя ссылка - будет показана кнопка "Посмотреть резюме"</li>
            <li>Если указаны оба варианта - будут показаны обе кнопки</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ResumeManager;
