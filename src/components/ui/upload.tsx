import { CardContent } from "./card"
import { Input } from "./input"
import { Upload } from "lucide-react"

type FileProp = {
    file: File | null;
    setFile: (file: File | null) => void;
};

export function UploadSection({ file, setFile }: FileProp) {
    return (
      <CardContent className="p-0 mb-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-4 text-gray-500" />
              {file ? (
                <p className="text-sm text-gray-500">File selected: {file.name}</p>
              ) : (
                <>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PDF, DOCX, or TXT</p>
                </>
              )}
            </div>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              required
            />
          </label>
        </div>
      </CardContent>
    );
}