import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTranslations, fetchTranslationByLang, updateTranslation, importTranslation, setCurrentTranslation, clearError } from '../../store/slices/translationsSlice';

function TranslationsManager() {
  const dispatch = useAppDispatch();
  const { items: translations, currentTranslation, loading, error } = useAppSelector((state) => state.translations);
  const [selectedLang, setSelectedLang] = useState('en');
  const [translationData, setTranslationData] = useState({});
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);

  useEffect(() => {
    dispatch(fetchTranslations());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLang) {
      dispatch(fetchTranslationByLang(selectedLang));
    }
  }, [selectedLang, dispatch]);

  useEffect(() => {
    if (currentTranslation?.data) {
      setTranslationData(currentTranslation.data);
    } else {
      setTranslationData({});
    }
  }, [currentTranslation]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await dispatch(updateTranslation({ language: selectedLang, data: translationData })).unwrap();
      alert('Перевод успешно сохранен!');
      dispatch(fetchTranslations());
    } catch (error) {
      alert(`Ошибка сохранения перевода: ${error}`);
    } finally {
      setSaving(false);
    }
  };

  const handleImport = async () => {
    if (!confirm('Вы уверены, что хотите импортировать переводы из JSON файла? Текущие данные будут перезаписаны.')) return;
    
    setImporting(true);
    try {
      await dispatch(importTranslation(selectedLang)).unwrap();
      alert('Перевод успешно импортирован из файла!');
      dispatch(fetchTranslationByLang(selectedLang));
      dispatch(fetchTranslations());
    } catch (error) {
      const errorMessage = error || 'Ошибка импорта перевода';
      alert(errorMessage + '\n\nФайл translation.json не найден. Убедитесь, что файл существует в папке client/src/locales/{язык}/');
    } finally {
      setImporting(false);
    }
  };

  const updateNestedValue = (obj, path, value) => {
    const keys = path.split('.');
    const newObj = { ...obj };
    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    return newObj;
  };

  const getNestedValue = (obj, path) => {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current && typeof current === 'object') {
        current = current[key];
      } else {
        return '';
      }
    }
    return current || '';
  };

  const renderTranslationFields = (obj, prefix = '') => {
    const fields = [];
    
    for (const key in obj) {
      const path = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        fields.push(
          <div key={path} className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">{key}</h3>
            <div className="ml-4 space-y-2">
              {renderTranslationFields(value, path)}
            </div>
          </div>
        );
      } else if (Array.isArray(value)) {
        fields.push(
          <div key={path} className="mb-4">
            <label className="block text-gray-300 mb-2">{key}</label>
            <textarea
              value={value.join(', ')}
              onChange={(e) => {
                const newValue = e.target.value.split(',').map(item => item.trim()).filter(item => item);
                setTranslationData(updateNestedValue(translationData, path, newValue));
              }}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
              rows="3"
            />
          </div>
        );
      } else {
        fields.push(
          <div key={path} className="mb-4">
            <label className="block text-gray-300 mb-2">{key}</label>
            <input
              type="text"
              value={getNestedValue(translationData, path)}
              onChange={(e) => {
                setTranslationData(updateNestedValue(translationData, path, e.target.value));
              }}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
            />
          </div>
        );
      }
    }

    return fields;
  };

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Управление переводами</h1>
        <div className="flex gap-2">
          <select
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
          <button
            onClick={handleImport}
            disabled={importing}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
            title="Импортировать переводы из файла translation.json"
          >
            {importing ? 'Импорт...' : 'Импортировать из JSON'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
          >
            {saving ? 'Сохранение...' : 'Сохранить перевод'}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        {Object.keys(translationData).length > 0 ? (
          <div className="space-y-4">
            {renderTranslationFields(translationData)}
          </div>
        ) : (
          <div className="text-gray-400">
            Данные перевода не найдены. Начните с добавления полей вручную или импортируйте из существующего JSON.
          </div>
        )}
      </div>
    </div>
  );
}

export default TranslationsManager;
