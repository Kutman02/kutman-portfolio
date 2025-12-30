import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProjects } from '../../store/slices/projectsSlice';
import { fetchSkills } from '../../store/slices/skillsSlice';
import { fetchContacts } from '../../store/slices/contactsSlice';

function AdminDashboard() {
  const dispatch = useAppDispatch();
  const { items: projects, loading: projectsLoading } = useAppSelector((state) => state.projects);
  const { items: skills, loading: skillsLoading } = useAppSelector((state) => state.skills);
  const { items: contacts, loading: contactsLoading } = useAppSelector((state) => state.contacts);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchContacts());
  }, [dispatch]);

  const loading = projectsLoading || skillsLoading || contactsLoading;

  if (loading) {
    return <div className="text-white">Загрузка...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Панель управления</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Проекты</h2>
          <p className="text-4xl font-bold text-blue-500">{projects.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Навыки</h2>
          <p className="text-4xl font-bold text-green-500">{skills.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Контакты</h2>
          <p className="text-4xl font-bold text-purple-500">{contacts.length}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
