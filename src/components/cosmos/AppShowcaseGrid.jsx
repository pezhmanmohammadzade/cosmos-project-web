import { cosmosApps } from '../../data/cosmosApps';
import AppSectionCard from './AppSectionCard';

export default function AppShowcaseGrid() {
  return (
    <div className="relative w-full flex flex-col gap-40 py-32 px-6 lg:px-24 z-10">
      {cosmosApps.map((app, index) => (
        <AppSectionCard 
          key={app.id} 
          app={app} 
          index={index} 
        />
      ))}
    </div>
  );
}
