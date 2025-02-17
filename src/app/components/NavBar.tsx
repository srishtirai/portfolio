import NavItem from './NavItem';

export default function NavBar() {
  const items = [
    { label: 'Intro', targetId: 'intro' },
    { label: 'Skills', targetId: 'skills' },
    { label: 'Education', targetId: 'education' },
    { label: 'Experience', targetId: 'experience' },
    { label: 'Projects', targetId: 'projects' },
    { label: 'About', targetId: 'about' },
  ];

  return (
    <div className="flex items-center justify-start space-x-8 p-4 top-0 left-0 right-0 bg-white z-10">
      {items.map((item) => (
        <NavItem key={item.targetId} label={item.label} targetId={item.targetId} />
      ))}
    </div>
  );
}
