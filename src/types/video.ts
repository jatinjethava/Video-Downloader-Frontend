export interface PlatformInfo {
  id: string;
  name: string;
  color: string;
  icon?: string;
  badge?: string;
  description?: string;
}

export interface VideoFormat {
  formatId: string;
  quality: string;
  resolution: string;
  extension: string;
  filesize: number | null;
  formattedSize: string;
  downloadUrl: string;
  isDirect: boolean;
  hasAudio: boolean;
  hasVideo: boolean;
}

export interface VideoResult {
  success: boolean;
  url: string;
  platform: PlatformInfo;
  title: string;
  description?: string;
  author?: string;
  thumbnail?: string;
  duration?: number | null;
  formattedDuration?: string;
  formats: VideoFormat[];
}
