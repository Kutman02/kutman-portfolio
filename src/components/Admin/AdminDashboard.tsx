import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { fetchTranslations } from '../../store/slices/translationsSlice';

function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { items: projects, loading: projectsLoading } = useAppSelector((state) => state.projects);
  const { items: translations, loading: translationsLoading } = useAppSelector((state) => state.translations);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTranslations());
  }, [dispatch]);

  const loading = projectsLoading || translationsLoading;

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Панель управления</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Проекты</h2>
          <p className="text-4xl font-bold text-blue-500">{projects.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Переводы</h2>
          <p className="text-4xl font-bold text-green-500">{translations.length}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
