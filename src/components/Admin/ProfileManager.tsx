import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProfile, updateProfile, clearError } from '../../store/slices/profileSlice';
import api from '../../utils/api';

function ProfileManager() {
  const dispatch = useAppDispatch();
  const { profilePhoto, profilePhotoAlt, loading, error } = useAppSelector((state) => state.profile);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    profilePhoto: '',
    profilePhotoAlt: ''
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    setFormData({
      profilePhoto: profilePhoto || '',
      profilePhotoAlt: profilePhotoAlt || ''
    });
  }, [profilePhoto, profilePhotoAlt]);

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

      const response = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.fullUrl || 
        `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8081'}${response.data.url}`;
      setFormData({ ...formData, profilePhoto: imageUrl });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Ошибка загрузки файла');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await dispatch(updateProfile(formData)).unwrap();
      alert('Профиль успешно сохранен!');
      dispatch(fetchProfile());
    } catch (error) {
      alert(`Ошибка сохранения профиля: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Управление профилем</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Фото профиля</label>
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
              value={formData.profilePhoto}
              onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg mt-2"
              placeholder="Или введите URL фото"
            />
            {formData.profilePhoto && (
              <img 
                src={formData.profilePhoto} 
                alt="Preview" 
                className="mt-4 w-32 h-32 object-cover rounded-full border-4 border-blue-500" 
              />
            )}
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Альтернативный текст для фото</label>
            <input
              type="text"
              value={formData.profilePhotoAlt}
              onChange={(e) => setFormData({ ...formData, profilePhotoAlt: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileManager;
