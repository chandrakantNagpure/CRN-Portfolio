import { useTech } from '../components/TechContext';

function HomePageTest() {
  const { bgColor } = useTech();

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: bgColor || '#ffffff' }}>
      <h1>Test Page - Portfolio is Working!</h1>
      <p>If you can see this, the basic app structure is working.</p>
      <p>Background color: {bgColor || 'default'}</p>
    </div>
  );
}

export default HomePageTest;
