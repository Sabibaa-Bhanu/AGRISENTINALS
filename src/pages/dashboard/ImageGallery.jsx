import React, { useState } from 'react';
import { 
  X, ChevronLeft, ChevronRight, Download, ZoomIn, ZoomOut, 
  RotateCw, Grid, Play, Pause, Heart, Share, Info,
  Image as ImageIcon, Filter, Calendar, MapPin, User
} from 'lucide-react';

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  // Sample agricultural images data
  const images = [
    {
      id: 1,
      url: '/images/crop-health-1.jpg',
      thumbnail: '/images/crop-health-1-thumb.jpg',
      title: 'Crop Health Improvement',
      description: 'Significant improvement in soybean crop health after treatment',
      date: '2023-09-15',
      location: 'Shivaji Nagar',
      farmer: 'Ramesh Patil',
      crop: 'Soybean',
      season: 'Kharif 2023',
      category: 'health_improvement',
      tags: ['recovery', 'pest_control', 'growth'],
      aiAnalysis: {
        healthScore: 85,
        yieldEstimate: '2.8 tons',
        issues: ['Pest controlled', 'Good growth'],
        confidence: 92
      }
    },
    {
      id: 2,
      url: '/images/weather-damage-1.jpg',
      thumbnail: '/images/weather-damage-1-thumb.jpg',
      title: 'Weather Damage Assessment',
      description: 'Waterlogging in cotton fields due to heavy rainfall',
      date: '2023-10-05',
      location: 'Gandhi Gram',
      farmer: 'Suresh Yadav',
      crop: 'Cotton',
      season: 'Kharif 2023',
      category: 'weather_damage',
      tags: ['waterlogging', 'rainfall', 'damage'],
      aiAnalysis: {
        healthScore: 62,
        yieldEstimate: '2.6 tons',
        issues: ['Waterlogging', 'Root damage'],
        confidence: 87
      }
    },
    {
      id: 3,
      url: '/images/pest-infestation-1.jpg',
      thumbnail: '/images/pest-infestation-1-thumb.jpg',
      title: 'Pest Infestation',
      description: 'Locust attack affecting wheat crops',
      date: '2023-12-10',
      location: 'Mahatma Nagar',
      farmer: 'Anita Deshmukh',
      crop: 'Wheat',
      season: 'Rabi 2023',
      category: 'pest_infestation',
      tags: ['locust', 'emergency', 'damage'],
      aiAnalysis: {
        healthScore: 35,
        yieldEstimate: '1.8 tons',
        issues: ['Severe pest damage', 'Leaf destruction'],
        confidence: 95
      }
    },
    {
      id: 4,
      url: '/images/record-yield-1.jpg',
      thumbnail: '/images/record-yield-1-thumb.jpg',
      title: 'Record Yield',
      description: 'Exceptional rice yield with improved irrigation',
      date: '2023-11-20',
      location: 'Nehru Colony',
      farmer: 'Mohammad Khan',
      crop: 'Rice',
      season: 'Kharif 2023',
      category: 'record_yield',
      tags: ['high_yield', 'irrigation', 'success'],
      aiAnalysis: {
        healthScore: 88,
        yieldEstimate: '5.2 tons',
        issues: ['None detected'],
        confidence: 89
      }
    }
  ];

  const categories = [
    { value: 'all', label: 'All Images', count: images.length },
    { value: 'health_improvement', label: 'Health Improvement', count: images.filter(img => img.category === 'health_improvement').length },
    { value: 'weather_damage', label: 'Weather Damage', count: images.filter(img => img.category === 'weather_damage').length },
    { value: 'pest_infestation', label: 'Pest Infestation', count: images.filter(img => img.category === 'pest_infestation').length },
    { value: 'record_yield', label: 'Record Yield', count: images.filter(img => img.category === 'record_yield').length }
  ];

  const filteredImages = images.filter(img => 
    filter === 'all' || img.category === filter
  );

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setZoom(1);
    setRotation(0);
    setShowInfo(false);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setZoom(1);
    setRotation(0);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
    setZoom(1);
    setRotation(0);
  };

  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
    setZoom(1);
    setRotation(0);
  };

  const toggleFavorite = (imageId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(imageId)) {
      newFavorites.delete(imageId);
    } else {
      newFavorites.add(imageId);
    }
    setFavorites(newFavorites);
  };

  const downloadImage = (image) => {
    // In a real app, this would download the actual image
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const rotateImage = () => {
    setRotation((rotation + 90) % 360);
  };

  const zoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 3));
  };

  const zoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const resetTransform = () => {
    setZoom(1);
    setRotation(0);
  };

  // Modal component for image view
  const ImageModal = () => {
    if (!selectedImage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 z-10 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 z-10 p-3 bg-gray-800 rounded-full text-white hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image container */}
          <div className="relative max-w-full max-h-full">
            <div className="max-w-full max-h-full flex items-center justify-center">
              <div
                className="transition-transform duration-200"
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`
                }}
              >
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-center text-gray-500 py-20 px-10 border-2 border-dashed border-gray-300 rounded">
                    <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium">Image: {selectedImage.title}</p>
                    <p className="text-sm mt-2">{selectedImage.description}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      (In a real application, this would display the actual image)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls toolbar */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
            <button
              onClick={zoomOut}
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            
            <button
              onClick={resetTransform}
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors text-sm"
            >
              Reset
            </button>
            
            <button
              onClick={zoomIn}
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
              disabled={zoom >= 3}
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            
            <button
              onClick={rotateImage}
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
            >
              <RotateCw className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => toggleFavorite(selectedImage.id)}
              className={`p-2 rounded transition-colors ${
                favorites.has(selectedImage.id)
                  ? 'text-red-500 bg-gray-700'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <Heart className="h-5 w-5" fill={favorites.has(selectedImage.id) ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={() => downloadImage(selectedImage)}
              className="p-2 text-white hover:bg-gray-700 rounded transition-colors"
            >
              <Download className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded transition-colors ${
                showInfo
                  ? 'text-blue-400 bg-gray-700'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              <Info className="h-5 w-5" />
            </button>
          </div>

          {/* Image info panel */}
          {showInfo && (
            <div className="absolute top-4 left-4 max-w-md bg-gray-800 bg-opacity-90 text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-sm text-gray-300 mb-3">{selectedImage.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{selectedImage.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{selectedImage.farmer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>{selectedImage.crop} • {selectedImage.season}</span>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="mt-4 pt-4 border-t border-gray-600">
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <div className="space-y-1 text-sm">
                  <div>Health Score: <span className="text-green-400">{selectedImage.aiAnalysis.healthScore}/100</span></div>
                  <div>Yield Estimate: <span className="text-blue-400">{selectedImage.aiAnalysis.yieldEstimate}</span></div>
                  <div>Confidence: <span className="text-yellow-400">{selectedImage.aiAnalysis.confidence}%</span></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Agricultural Image Gallery</h1>
            <p className="text-gray-600 mt-2">Visual documentation of crop health and events</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'slideshow' : 'grid')}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Grid className="h-4 w-4 mr-2" />
              {viewMode === 'grid' ? 'Slideshow' : 'Grid'} View
            </button>
            
            {viewMode === 'slideshow' && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setFilter(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === category.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Image Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => openImage(image, index)}
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 relative overflow-hidden">
                  <div className="w-full h-48 bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">{image.title}</p>
                      <p className="text-xs text-gray-500 mt-1">{image.crop}</p>
                    </div>
                  </div>
                  
                  {/* Favorite indicator */}
                  {favorites.has(image.id) && (
                    <div className="absolute top-2 right-2">
                      <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 truncate">{image.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 truncate">{image.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(image.date).toLocaleDateString()}</span>
                    <span>{image.crop}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2">
                    {image.tags.slice(0, 2).map(tag => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {image.tags.length > 2 && (
                      <span className="text-xs text-gray-500">+{image.tags.length - 2}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Slideshow View */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Slideshow View</h3>
              <p className="text-gray-600">Slideshow functionality coming soon...</p>
              <button
                onClick={() => setViewMode('grid')}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Return to Grid View
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600">Try changing your filter criteria</p>
          </div>
        )}

        {/* Image Modal */}
        <ImageModal />
      </div>
    </div>
  );
};

export default ImageGallery;