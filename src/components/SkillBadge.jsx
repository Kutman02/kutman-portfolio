function SkillBadge({ skill }) {
  return (
    <div className="bg-gray-700/50 p-3 sm:p-4 rounded-lg flex items-center justify-center">
      <span className="text-sm sm:text-base font-medium text-center">{skill}</span>
    </div>
  );
}

export default SkillBadge;
