import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchContacts, createContact, updateContact, deleteContact, clearError } from '../../store/slices/contactsSlice';

const ICON_OPTIONS = [
  { value: 'FaEnvelope', label: 'Email' },
  { value: 'FaLinkedin', label: 'LinkedIn' },
  { value: 'FaGithub', label: 'GitHub' },
  { value: 'FaTelegram', label: 'Telegram' },
  { value: 'FaTwitter', label: 'Twitter' },
  { value: 'FaInstagram', label: 'Instagram' },
  { value: 'FaFacebook', label: 'Facebook' },
  { value: 'FaWhatsapp', label: 'WhatsApp' }
];

function ContactsManager() {
  const dispatch = useAppDispatch();
  const { items: contacts, loading, error } = useAppSelector((state) => state.contacts);
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    icon: 'FaEnvelope',
    order: 0
  });

  useEffect(() => {
    dispatch(fetchContacts());
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
      const contactData = {
        ...formData,
        order: parseInt(formData.order) || 0
      };

      if (editingContact) {
        await dispatch(updateContact({ id: editingContact._id, contactData })).unwrap();
      } else {
        await dispatch(createContact(contactData)).unwrap();
      }

      setShowModal(false);
      setEditingContact(null);
      setFormData({ platform: '', url: '', icon: 'FaEnvelope', order: 0 });
      dispatch(fetchContacts());
    } catch (error) {
      alert(`Ошибка сохранения контакта: ${error}`);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      platform: contact.platform,
      url: contact.url,
      icon: contact.icon,
      order: contact.order || 0
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить этот контакт?')) return;

    try {
      await dispatch(deleteContact(id)).unwrap();
      dispatch(fetchContacts());
    } catch (error) {
      alert(`Ошибка удаления контакта: ${error}`);
    }
  };

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Управление контактами</h1>
        <button
          onClick={() => {
            setEditingContact(null);
            setFormData({ platform: '', url: '', icon: 'FaEnvelope', order: 0 });
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Добавить контакт
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.length === 0 ? (
          <div className="text-gray-400 col-span-full text-center py-8">Контакты не найдены</div>
        ) : (
          contacts.map((contact) => (
            <div key={contact._id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{contact.platform}</h3>
                  <p className="text-gray-400 text-sm break-all">{contact.url}</p>
                  <p className="text-gray-500 text-xs mt-1">Иконка: {contact.icon}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(contact)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={() => handleDelete(contact._id)}
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
              {editingContact ? 'Редактировать контакт' : 'Добавить контакт'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Платформа</label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Иконка</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                >
                  {ICON_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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
                  {editingContact ? 'Обновить' : 'Создать'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingContact(null);
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

export default ContactsManager;
