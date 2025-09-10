import { Box, Flex } from '@radix-ui/themes';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

type UploadProps = {
  onChange: (params: File[]) => void;
  value: File[];
  dropzoneProps: DropzoneOptions;
};

const Upload = ({ onChange, value, dropzoneProps }: UploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    ...dropzoneProps,
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles);
    },
  });

  return (
    <Box>
      <Flex
        style={{
          background: 'var(--gray-a8)',
          borderRadius: 'var(--radius-3)',
          cursor: 'pointer',
        }}
        width="100%"
        align="center"
        justify="center"
        {...getRootProps()}
        className="p-6 border-2 border-dashed rounded cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>Drag & drop audio files here, or click to select</p>
      </Flex>
      {value && value.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600">
          {value.map((file) => (
            <li key={file.name}>
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </li>
          ))}
        </ul>
      )}
    </Box>
  );
};

export default Upload;
