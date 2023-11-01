import { Modal, Upload } from 'antd';
import { useEffect, useState } from "react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useUploader } from '../../Hooks/useUploader';
import ImgCrop from 'antd-img-crop';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const Uploader = ({ setter, folderName, limit }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [fileListURL, setFileListURL] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const [showPreview, setShowPreview] = useState(false)
    const [FileType, setFileType] = useState('')
    console.log(FileType)

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async ({ file, fileList }) => {
        if (file.status === 'done') {
            if (fileURL) setFileListURL(old => [...old, fileURL])

        } else if (file.status === 'error') {
            file.status = 'done'

            const fileURL = await useUploader(file.originFileObj, folderName)

            if (fileURL) setFileListURL(old => [...old, fileURL])
        }



        setFileList(fileList)
    }
    useEffect(() => {
        fileListURL.reverse()
        fileList.reverse()
        setFileType(fileList[0]?.type)
        setShowPreview(fileListURL[0])
        setter(old => { return ({ ...old, img: fileListURL }) })

    }, [fileList, fileListURL])


    const uploadButton = (
        <div className='centeraa'>
            <AiOutlinePlusSquare color='white' size={24} />
            <div className=' text-white'>
                Upload
            </div>
        </div>
    );
    return (
        <div className=' flex flex-col  items-center'>
            <div>


                <ImgCrop showGrid aspectSlider showReset aspect rotationSlider fillColor='red' >


                    \\\\\<Upload
                        className=' relative'
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        fileList={fileList}
                        showUploadList={false}
                        onPreview={''}
                        onChange={handleChange}
                        accept="image/*, video/*"
                        maxCount={limit ? limit : 8}
                        multiple

                    >
                        {fileList.length >= limit ? null : uploadButton}
                    </Upload>

                </ImgCrop>

            </div>
            <div className='w-96 overflow-y-scroll hidescroll   h-72  text-white rounded-3xl '>
                {FileType?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={showPreview} alt="" />}
                {FileType?.includes('image') && <img className='w-full  object-cover' src={showPreview} alt="" />}

            </div>




        </div>
    );
};