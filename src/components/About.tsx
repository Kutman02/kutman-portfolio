/**
 * @fileoverview Компонент секции "Обо мне"
 */

import { useEffect } from 'react';
import SkillBadge from './SkillBadge';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSkills } from '../store/slices/skillsSlice';
import type { Skill } from '../types/models';

/**
 * Компонент секции "Обо мне"
 */
function About() {
  const dispatch = useAppDispatch();
  const [leftRef, isLeftVisible] = useScrollAnimation();
  const [rightRef, isRightVisible] = useScrollAnimation(0.2);
  const skills = useAppSelector((state) => state.skills.items);

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  // Собираем все навыки из всех категорий
  const allSkills = skills.flatMap((skill: Skill) => skill.items || []);

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Обо мне</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div
            ref={leftRef}
            className={`space-y-4 sm:space-y-6 transform transition-all duration-700 ${
              isLeftVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Я Frontend-разработчик с опытом создания современных веб-приложений. Специализируюсь на React, TypeScript и современных инструментах разработки.
            </p>
          </div>

          <div
            ref={rightRef}
            className={`transform transition-all duration-700 ${
              isRightVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6">Навыки</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {allSkills.map((skill: string, index: number) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
