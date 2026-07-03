import { useState } from 'react';
import { Image as ImageIcon, Sparkles, FolderSync, PlusCircle, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';
import GoogleDriveBrowser from '../components/GoogleDriveBrowser';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Farewell' | 'Experiment' | 'Events' | 'Drive Assets';
  imageUrl: string;
  description: string;
  date: string;
}

interface GalleryProps {
  driveToken: string | null;
  onConnectDrive: () => void;
  isConnectingDrive: boolean;
  onDemoConnect?: () => void;
  onSelectPage?: (page: string) => void;
}

export default function Gallery({ driveToken, onConnectDrive, isConnectingDrive, onDemoConnect, onSelectPage }: GalleryProps) {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([
    {
      id: 'g-1',
      title: 'Masters Batch 2022 Farewell',
      category: 'Farewell',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcBb8-mhRrikMniOpX_EAKBakx-Et_vhon3ANP454si1jZKZAyhUsrlJ-YNuzCvE-vM3XTgSCY4p_O5xV-CvdsOQ07UVLVxELFm3iHpXZ1kMiRLJs_5nJo-NG9TA5Q2QNqa2OkpaMpDsG0ViMIJhLyanpzCRUvQhR8John7J4SyFqMZeAwa0uXpmTEfeg/s320/WhatsApp%20Image%202026-07-03%20at%203.28.19%20PM.jpeg',
      description: 'Official farewell gathering of our masters thesis batch after their successful dissertation defense.',
      date: 'July 2024'
    },
    {
      id: 'g-2',
      title: 'Masters Batch 2023 Farewell',
      category: 'Farewell',
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgDKHYY96cdMhSQxzDzzCshVofLO7n9xYIpUH7Q6KHBA_hUQ7z7fyHBnH-1O3juy8Uq0cFZ_8Sng4Tmp_OnZJ7DtHJ_2aGsP-eoY3wB1TZQISHd2qkttJ6LubrCUqOHTb2kLhNHjeVBfV3__jlDtJkgbJMaucX8FxkFmorguPSojRv8PA0he02KBiW_o6Q/s320/WhatsApp%20Image%202026-07-03%20at%2011.30.23%20PM.jpeg',
      description: 'Celebrating the achievements and bench milestones of our 2023 project graduates.',
      date: 'December 2025'
    },
    {
      id: 'g-3',
      title: 'Antibiotic Sensitivity Testing (AST) Agar Plates',
      category: 'Experiment',
      imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800', // petri dish feel
      description: 'Visual screening of multi-resistant Klebsiella and Salmonella isolates against selected clinical drugs.',
      date: 'April 2025'
    },
    {
      id: 'g-4',
      title: 'Soil Sample Inoculation under Biosafety Class II',
      category: 'Experiment',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
      description: 'Aseptic purification of heavy-metal clearing PGPR isolates sourced from Savar irrigated plots.',
      date: 'June 2025'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Farewell', 'Experiment', 'Events'];

  const filteredGallery = galleryList.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12" id="gallery-page">
      {/* Header */}
      <div className="space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-teal font-semibold">Visual Archives</span>
        <h1 className="text-3xl sm:text-5xl font-bold text-teal-deep font-serif">Laboratory Photo Gallery</h1>
        <p className="text-sm sm:text-base text-ink-soft max-w-2xl leading-relaxed">
          Take a look inside the lab events, student celebrations, and actual microbiological specimens on our research benches.
        </p>
      </div>

      {/* Category Tabs & Grid Container */}
      <div className="space-y-6">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-line">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                selectedCategory === cat
                  ? 'bg-teal text-white border-teal shadow-xs'
                  : 'bg-bg text-ink-soft border-line hover:bg-bg-alt hover:text-teal'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid-display">
          {filteredGallery.length === 0 ? (
            <div className="col-span-full py-12 text-center text-ink-faint italic text-xs">
              No photos inside this category.
            </div>
          ) : (
            filteredGallery.map((item) => {
              const isSpecialAlbum = item.id === 'g-1' || item.id === 'g-2';
              const targetPage = item.id === 'g-1' ? 'farewell-2022' : 'farewell-2023';
              const photoCount = item.id === 'g-1' ? 11 : 14;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isSpecialAlbum && onSelectPage) {
                      onSelectPage(targetPage);
                    }
                  }}
                  className={`bg-paper border border-line rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                    isSpecialAlbum 
                      ? 'hover:border-teal cursor-pointer ring-1 ring-teal/5 hover:ring-teal/20' 
                      : 'hover:border-teal'
                  }`}
                >
                  <div className="aspect-[4/3] bg-bg relative overflow-hidden group">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[9px] font-mono font-bold text-teal shadow-sm">
                      {item.category}
                    </div>

                    {/* Special Album Hover Overlay */}
                    {isSpecialAlbum && (
                      <div className="absolute inset-0 bg-teal-deep/30 backdrop-blur-3xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white/95 backdrop-blur-xs text-teal-deep font-semibold text-xs py-2 px-4 rounded-full shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all">
                          <Sparkles className="w-3.5 h-3.5 text-teal animate-spin-slow" />
                          Open Photo Album
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-ink-faint">
                        <span>MHSL RU GEB</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-serif font-bold text-teal-deep text-base truncate" title={item.title}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed" title={item.description}>
                        {item.description}
                      </p>
                    </div>

                    {/* Branded Album Button */}
                    {isSpecialAlbum && (
                      <div className="pt-2">
                        <button 
                          className="w-full bg-teal-pale hover:bg-teal text-teal-deep hover:text-white font-semibold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSelectPage) onSelectPage(targetPage);
                          }}
                        >
                          <span>View Interactive Album ({photoCount} Photos)</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
