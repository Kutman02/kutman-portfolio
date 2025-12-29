/**
 * @fileoverview Компонент бейджа навыка
 */

import type { SkillBadgeProps } from '../types/components';

/**
 * Компонент бейджа навыка
 */
function SkillBadge({ skill }: SkillBadgeProps) {
  const skillName = typeof skill === 'string' ? skill : skill?.name || '';

  return (
    <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg flex items-center justify-center">
      <span className="text-sm sm:text-base font-medium text-center">{skillName}</span>
    </div>
  );
}

export default SkillBadge;
