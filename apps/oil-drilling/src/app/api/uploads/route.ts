/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import * as XLSX from "xlsx";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let processedData = null;

    // Check if it's an Excel file
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      try {
        // Parse Excel file
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Process the data (assuming first row is headers)
        if (jsonData.length > 1) {
          const headers = jsonData[0] as string[];
          const dataRows = jsonData.slice(1) as any[][];
          
          processedData = dataRows.map(row => {
            const obj: any = {};
            headers.forEach((header, index) => {
              if (header && row[index] !== undefined) {
                // Clean header names and convert to appropriate types
                const cleanHeader = header.trim().replace(/\s+/g, '');
                let value = row[index];
                
                // Convert numeric values
                if (typeof value === 'string' && !isNaN(Number(value))) {
                  value = Number(value);
                }
                
                obj[cleanHeader] = value;
              }
            });
            return obj;
          }).filter(row => Object.keys(row).length > 0);
          
        }
      } catch (excelError) {
        console.error('Excel parsing error:', excelError);
        // Continue with file upload even if Excel parsing fails
      }
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "uploads",
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });
    
    return NextResponse.json({ 
      url: (result as any).secure_url,
      publicId: (result as any).public_id,
      processedData: processedData,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: "Upload failed" }, 
      { status: 500 }
    );
  }
}
