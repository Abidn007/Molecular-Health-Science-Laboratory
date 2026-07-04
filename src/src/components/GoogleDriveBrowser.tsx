import { useState, useEffect } from 'react';
import { Folder, Image, FileText, Search, RefreshCw, AlertCircle, Check, Grid, List, ExternalLink } from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webContentLink?: string;
  webViewLink?: string;
  size?: string;
}

interface GoogleDriveBrowserProps {
  accessToken: string | null;
  onSelectImage?: (file: { id: string; name: string; url: string }) => void;
  onConnectDrive: () => void;
  isConnecting: boolean;
  onDemoConnect?: () => void;
}

export default function GoogleDriveBrowser({
  accessToken,
  onSelectImage,
  onConnectDrive,
  isConnecting,
  onDemoConnect,
}: GoogleDriveBrowserProps) {
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [folders, setFolders] = useState<DriveFile[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [folderPath, setFolderPath] = useState<{ id: string; name: string }[]>([{ id: 'root', name: 'My Drive' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);

  // Fetch files in current folder
  const fetchDriveContents = async (folderId: string) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      if (accessToken === 'demo-token-abc-123') {
        // Mock Google Drive folders & files
        if (folderId === 'root' || folderPath.length <= 1) {
          setFolders([
            {
              id: 'folder-lab-images',
              name: 'Lab Images',
              mimeType: 'application/vnd.google-apps.folder',
            }
          ]);
          setFiles([]);
        } else {
          setFolders([]);
          setFiles([
            {
              id: 'drive-1',
              name: 'Agarose Gel Electrophoresis PCR.png',
              mimeType: 'image/png',
              thumbnailLink: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=220',
              webContentLink: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=800',
              webViewLink: 'https://unsplash.com/photos/a-close-up-of-some-test-tubes-on-a-table-pH7uz-E2tHQ',
            },
            {
              id: 'drive-2',
              name: 'Fluorescence Microscopy Assay.png',
              mimeType: 'image/png',
              thumbnailLink: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=220',
              webContentLink: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800',
              webViewLink: 'https://unsplash.com/photos/a-white-and-blue-machine-with-liquid-inside-of-it-H_g-O_XW88o',
            },
            {
              id: 'drive-3',
              name: 'Bacterial Colony Morphology.jpg',
              mimeType: 'image/jpeg',
              thumbnailLink: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=220',
              webContentLink: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
              webViewLink: 'https://unsplash.com/photos/a-close-up-of-a-person-holding-a-pipette-m3p9tW7K14o',
            }
          ]);
        }
        setLoading(false);
        return;
      }
      // Query parameters for folders and files
      const q = `'${folderId}' in parents and trashed = false`;
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        q
      )}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink,size)&pageSize=50`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Google Drive API error: ${response.statusText}`);
      }

      const data = await response.json();
      const allFiles: DriveFile[] = data.files || [];

      // Split into folders and files
      const foundFolders = allFiles.filter(f => f.mimeType === 'application/vnd.google-apps.folder');
      const foundFiles = allFiles.filter(f => f.mimeType !== 'application/vnd.google-apps.folder');

      setFolders(foundFolders);
      setFiles(foundFiles);
    } catch (err: any) {
      console.error('Error fetching drive contents:', err);
      setError(err.message || 'Failed to retrieve files. Make sure you granted Drive permissions.');
    } finally {
      setLoading(false);
    }
  };

  // Search specifically for a folder named "Lab Images"
  const findLabImagesFolder = async () => {
    if (!accessToken) return;
    if (accessToken === 'demo-token-abc-123') {
      setCurrentFolderId('folder-lab-images');
      setFolderPath([{ id: 'root', name: 'My Drive' }, { id: 'folder-lab-images', name: 'Lab Images' }]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const q = "name contains 'Lab Images' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";
      const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.files && data.files.length > 0) {
          const labFolder = data.files[0];
          setCurrentFolderId(labFolder.id);
          setFolderPath([{ id: 'root', name: 'My Drive' }, { id: labFolder.id, name: labFolder.name }]);
        } else {
          // If not found, list root folder
          setCurrentFolderId('root');
          setFolderPath([{ id: 'root', name: 'My Drive' }]);
        }
      }
    } catch (err) {
      console.error('Error searching for Lab Images folder:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      if (currentFolderId === 'root' && folderPath.length === 1) {
        findLabImagesFolder().then(() => {
          fetchDriveContents(currentFolderId);
        });
      } else {
        fetchDriveContents(currentFolderId);
      }
    }
  }, [accessToken, currentFolderId]);

  const handleFolderClick = (folder: DriveFile) => {
    setCurrentFolderId(folder.id);
    setFolderPath([...folderPath, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const target = folderPath[index];
    setCurrentFolderId(target.id);
    setFolderPath(folderPath.slice(0, index + 1));
  };

  const handleSelectFile = (file: DriveFile) => {
    const isImage = file.mimeType.startsWith('image/');
    if (!isImage) return;

    if (onSelectImage) {
      // Use webContentLink or thumbnailLink
      const url = file.thumbnailLink?.replace('=s220', '=s800') || file.webContentLink || '';
      onSelectImage({
        id: file.id,
        name: file.name,
        url: url,
      });

      // Toggle selection in UI
      if (selectedFileIds.includes(file.id)) {
        setSelectedFileIds(selectedFileIds.filter(id => id !== file.id));
      } else {
        setSelectedFileIds([...selectedFileIds, file.id]);
      }
    }
  };

  const isSelected = (id: string) => selectedFileIds.includes(id);

  // Filter files by search term
  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredFolders = folders.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!accessToken) {
    return (
      <div className="bg-paper border border-line rounded-2xl p-8 text-center max-w-lg mx-auto space-y-4">
        <svg className="w-12 h-12 text-teal mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
        </svg>
        <h3 className="font-serif font-semibold text-lg text-teal-deep">Browse Your Laboratory Assets</h3>
        <p className="text-xs text-ink-soft leading-relaxed">
          Log in with your Google Account to connect the lab's secure Google Drive. This lets you access your <strong>"Lab Images"</strong> folder to view and import research media, logos, and figures directly into the gallery or project files.
        </p>
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={onConnectDrive}
            disabled={isConnecting}
            className="w-full inline-flex justify-center items-center gap-2 bg-teal hover:bg-teal-deep text-white font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            {isConnecting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Connecting Securely...
              </>
            ) : (
              'Connect Google Drive'
            )}
          </button>
          
          {onDemoConnect && (
            <button
              onClick={onDemoConnect}
              className="w-full inline-flex justify-center items-center gap-1.5 bg-bg-alt hover:bg-teal-pale/40 border border-line text-teal-deep font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer text-xs"
            >
              Use Sandbox Demo Drive
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper border border-line rounded-2xl p-6 space-y-4 shadow-sm" id="google-drive-explorer">
      {/* Explorer Top Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-line">
        <div>
          <h3 className="font-serif font-bold text-base text-teal-deep flex items-center gap-2">
            <svg className="w-5 h-5 text-teal" viewBox="0 0 48 48">
              <path fill="#0066da" d="M17 13.5l22.5 31H31L8.5 13.5H17z"/>
              <path fill="#00a85d" d="M31.5 44.5h16L25 4.5h-16L31.5 44.5z"/>
              <path fill="#ffcd00" d="M8.5 13.5L.5 27.5l8 14H33l8-14h-24L8.5 13.5z"/>
            </svg>
            Google Drive Explorer
          </h3>
          <p className="text-[11px] text-ink-faint">Accessing files securely from your Drive (Lab Images folder preferred)</p>
        </div>

        {/* View toggles and refresh */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between">
          <div className="flex border border-line rounded-lg overflow-hidden bg-bg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 cursor-pointer ${viewMode === 'grid' ? 'bg-white text-teal shadow-xs' : 'text-ink-faint'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 cursor-pointer ${viewMode === 'list' ? 'bg-white text-teal shadow-xs' : 'text-ink-faint'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => fetchDriveContents(currentFolderId)}
            disabled={loading}
            className="p-2 border border-line rounded-lg hover:bg-bg-alt text-ink-soft cursor-pointer"
            title="Refresh Files"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Navigation Breadcrumb */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono py-1">
        {folderPath.map((folder, index) => (
          <span key={folder.id} className="flex items-center gap-1.5">
            {index > 0 && <span className="text-ink-faint">/</span>}
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className={`hover:text-teal hover:underline cursor-pointer font-semibold ${
                index === folderPath.length - 1 ? 'text-teal font-bold' : 'text-ink-soft'
              }`}
            >
              {folder.name}
            </button>
          </span>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-ink-faint">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          placeholder="Filter files by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-line rounded-xl bg-bg text-sm focus:outline-none focus:border-teal"
        />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="py-12 text-center space-y-2">
          <RefreshCw className="w-8 h-8 text-teal animate-spin mx-auto" />
          <p className="text-xs text-ink-soft">Loading folder contents...</p>
        </div>
      )}

      {/* Error state */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-100 text-red-800 p-4 rounded-xl flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Access Issue</p>
            <p className="mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Contents */}
      {!loading && !error && (
        <div className="max-h-[350px] overflow-y-auto space-y-4">
          {/* Folders List */}
          {filteredFolders.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono uppercase tracking-wider text-ink-faint font-bold">Subfolders</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => handleFolderClick(folder)}
                    className="flex items-center gap-3 p-2.5 border border-line hover:border-teal hover:bg-teal-pale/25 rounded-xl cursor-pointer text-left transition-all"
                  >
                    <Folder className="w-5 h-5 text-amber-500 fill-amber-500/20 flex-shrink-0" />
                    <span className="text-xs font-medium truncate text-ink">{folder.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Files List */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono uppercase tracking-wider text-ink-faint font-bold">Files (Images and Figures)</h4>
            {filteredFiles.length === 0 ? (
              <p className="text-xs text-ink-faint italic py-4">No individual files found in this folder matching filters.</p>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredFiles.map((file) => {
                  const isImage = file.mimeType.startsWith('image/');
                  return (
                    <div
                      key={file.id}
                      onClick={() => handleSelectFile(file)}
                      className={`relative border rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected(file.id)
                          ? 'border-teal bg-teal-pale/20 ring-2 ring-teal'
                          : 'border-line hover:border-teal bg-bg'
                      }`}
                      style={{ aspectRatio: '1/1' }}
                    >
                      {/* Thumbnail or Icon */}
                      <div className="flex-1 flex items-center justify-center overflow-hidden bg-white relative">
                        {isImage && file.thumbnailLink ? (
                          <img
                            src={file.thumbnailLink.replace('=s220', '=s400')}
                            alt={file.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : isImage ? (
                          <Image className="w-8 h-8 text-teal/40" />
                        ) : (
                          <FileText className="w-8 h-8 text-ink-faint" />
                        )}

                        {/* Selected overlay */}
                        {isSelected(file.id) && (
                          <div className="absolute inset-0 bg-teal/20 flex items-center justify-center">
                            <span className="bg-teal text-white p-1 rounded-full">
                              <Check className="w-4 h-4" />
                            </span>
                          </div>
                        )}
                      </div>

                      {/* File Name Footer */}
                      <div className="bg-paper p-1.5 border-t border-line text-left">
                        <p className="text-[10px] font-medium truncate text-ink-soft" title={file.name}>
                          {file.name}
                        </p>
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[9px] text-teal font-semibold flex items-center gap-0.5 hover:underline mt-0.5 print:hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-2.5 h-2.5" />
                            Open Original
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="border border-line rounded-xl overflow-hidden divide-y divide-line bg-white">
                {filteredFiles.map((file) => {
                  const isImage = file.mimeType.startsWith('image/');
                  return (
                    <div
                      key={file.id}
                      onClick={() => handleSelectFile(file)}
                      className={`flex items-center justify-between p-2.5 cursor-pointer transition-all ${
                        isSelected(file.id) ? 'bg-teal-pale/35' : 'hover:bg-bg'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isImage ? (
                          <Image className="w-4 h-4 text-teal" />
                        ) : (
                          <FileText className="w-4 h-4 text-ink-faint" />
                        )}
                        <span className="text-xs text-ink truncate max-w-[200px] sm:max-w-md" title={file.name}>
                          {file.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {isSelected(file.id) && (
                          <span className="bg-teal/10 text-teal p-0.5 rounded-full">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-ink-faint hover:text-teal print:hidden"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
