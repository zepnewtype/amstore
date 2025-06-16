import { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface TableSettingItem {
  id: string;
  name: string;
  image: string;
  type: 'plate' | 'glass' | 'cutlery' | 'accessory';
  size?: string;
  position: { x: number; y: number; z: number; rotate: number; };
}

const placeSetting: TableSettingItem[] = [
  {
    id: 'dinner-plate',
    name: 'Dinner Plate',
    image: 'https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234',
    type: 'plate',
    size: '28 cm',
    position: { x: 50, y: 50, z: 1, rotate: 0 }
  },
  {
    id: 'salad-plate',
    name: 'Salad Plate',
    image: 'https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234',
    type: 'plate',
    size: '20 cm',
    position: { x: 50, y: 50, z: 2, rotate: 0 }
  },
  {
    id: 'bread-plate',
    name: 'Bread Plate',
    image: 'https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234',
    type: 'plate',
    size: '16 cm',
    position: { x: 25, y: 30, z: 3, rotate: 0 }
  },
  {
    id: 'wine-glass',
    name: 'Wine Glass',
    image: 'https://ampriomilano.com/cdn/shop/files/PLAR.MICA04_3efcc2df-8b59-40e7-aa67-0bc005720fb8_400x.png?v=1746463780',
    type: 'glass',
    position: { x: 60, y: 30, z: 3, rotate: 0 }
  }
];

const TableSettingVisualizer = () => {
  const [settings] = useState<TableSettingItem[]>(placeSetting);
  
  return (
    <div className="border border-gray-200 p-4 rounded-md">
      <h3 className="text-xl font-serif mb-4 text-center">Table Setting Suggestion</h3>
      <div className="w-full mb-6">
        <AspectRatio ratio={16/9} className="relative bg-gray-100 rounded">
          {/* Table top background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1594224457860-02a55f49e315?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          
          {/* Place setting items */}
          {settings.map((item) => (
            <div
              key={item.id}
              className="absolute"
              style={{
                left: `${item.position.x}%`,
                top: `${item.position.y}%`,
                zIndex: item.position.z,
                transform: `translate(-50%, -50%) rotate(${item.position.rotate}deg)`,
                width: item.type === 'plate' ? `${parseInt(item.size || '0') * 1.2}px` : '80px',
                height: item.type === 'plate' ? `${parseInt(item.size || '0') * 1.2}px` : '80px',
              }}
            >
              <img 
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </AspectRatio>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
        {settings.map((item) => (
          <div key={item.id} className="bg-gray-50 p-2 rounded">
            <div className="w-12 h-12 mx-auto mb-2">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-contain" 
              />
            </div>
            <p className="font-medium">{item.name}</p>
            {item.size && <p className="text-xs text-gray-500">Ø {item.size}</p>}
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Explore our suggested table setting combinations to create the perfect dining experience.
        <a href="/tableware" className="text-brand-green ml-1 hover:underline">View all tableware</a>
      </p>
    </div>
  );
};

export default TableSettingVisualizer;
