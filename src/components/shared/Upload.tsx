import styled from '@emotion/styled';
import React, { ChangeEvent, useId, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { IconButton } from '@mui/material';
import { Close, FileUploadOutlined } from '@mui/icons-material';
import { IMAGE_URL } from '../../../app.config';


type Props = {
    onChange: (payload: File | null) => void;
    onChangeUrl: (url: string) => void;
    value?: File | null;
    url: string;
    name: string;
    label?: string;
    className?: string;
};

const Label = styled.label`
  border: 1px dashed #cccccc;
  width: 100%;
  min-height: 100px;
  cursor: pointer;
`;

const ImageUpload = React.forwardRef<HTMLInputElement, Props>(

    ({ onChange, onChangeUrl, value, url, name, label, className, ...rest }, ref) => {
        const [fileUrl, setFileUrl] = useState<string | null>(null);
        const id = useId();

        function handleChange(event: ChangeEvent<HTMLInputElement>) {
            if (event.target.files) {
                const file = event.target.files[0];
                const url = URL.createObjectURL(file);
                onChange(file);
                onChangeUrl(url);
                setFileUrl(url);
            }
        }

        function reset() {
            onChange(null);
            onChangeUrl('');
            setFileUrl(null);
        }

        return (
            <>
                <div className="flex justify-between items-center">
                    {label && <label className="my-2">{label}</label>}
                    {value && (
                        <IconButton size="small" sx={{ my: 1 }} onClick={reset}>
                            <Close />
                        </IconButton>
                    )}
                </div>
                <Label
                    className={`text-center flex items-center justify-center relative ${className}`}
                    htmlFor={`input-file-${id}`}
                >
                    {url || fileUrl ? (
                        <img
                            className="h-72"
                            src={
                                url?.includes('http') || fileUrl === null
                                    ? url
                                    : `${IMAGE_URL}+${url}`
                            }
                            alt="img"
                        />
                    ) : (
                        <span>اختر صورة لرفعها</span>
                    )}
                </Label>
                <input
                    ref={ref}
                    placeholder="input"
                    name={name}
                    className="hidden"
                    id={`input-file-${id}`}
                    type="file"
                    onChange={handleChange}
                />
            </>
        );
    }
);

export default ImageUpload;