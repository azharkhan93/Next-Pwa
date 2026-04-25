import QRCode from 'qrcode';

/**
 * Generates a minimalist QR Code as a Data URL
 * Points to the secure verification portal
 */
export async function generateVerificationQR(recordId: string): Promise<string> {
  try {
    // Determine the base URL based on environment
    // Production: https://next-pwa-kappa-beryl.vercel.app
    // Development: http://localhost:3001 (standard for this project)
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd 
      ? 'https://next-pwa-kappa-beryl.vercel.app' 
      : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001');
    
    const verificationUrl = `${baseUrl}/verify/${recordId}`;
    
    // Generate QR code with high contrast and small margin
    const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
      margin: 1,
      width: 120, // Slightly increased for better scanning reliability
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M'
    });
    
    return qrDataUrl;
  } catch (err) {
    console.error('QR Generation Error:', err);
    throw err;
  }
}
