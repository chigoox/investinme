import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from "react";
import { AiOutlinePlusSquare, AiOutlineQuestion } from "react-icons/ai";
import { useUploader } from '../../Hooks/useUploader';
import { Button, Skeleton, Textarea } from '@nextui-org/react';
import { Image, Text, Video } from 'lucide-react';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const Uploader = ({ setter, folderName, limit, setPostType, post, inCricle, forthis, submitPost, handleCaption }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [fileListURL, setFileListURL] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const [showPreview, setShowPreview] = useState(false)
    const [FileType, setFileType] = useState('')


    console.log(post)

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
            setFileType(file.type)
            setter(old => { return ({ ...old, postType: file.type }) })
            const fileURL = await useUploader(file.originFileObj, folderName)
            if (fileURL) setFileListURL(old => [...old, fileURL])

        } else if (file.status === 'error') {
            file.status = 'done'
            setter(old => { return ({ ...old, postType: file.type }) })
            setFileType(file.type)
            const fileURL = await useUploader(file.originFileObj, folderName)

            if (fileURL) setFileListURL(old => [...old, fileURL])
        }



        setFileList(fileList)
    }

    useEffect(() => {
        fileListURL.reverse()
        fileList.reverse()
        // setter(old => { return ({ ...old, post: { img: fileListURL } }) })
    }, [])

    useEffect(() => {
        setter(old => { return ({ ...old, post: { img: fileListURL } }) })

    }, [fileList, fileListURL])




    useEffect(() => {

        setFileType(fileList[0]?.type)
        if (setPostType) setPostType(fileList[0]?.type)
        setShowPreview(fileListURL[0])



    }, [fileList, fileListURL, post])


    const uploadButton = (
        <div>
            <div className='center overflow-hidden relative mt-24 border-4 rounded-full w-40 h-40 bg-black-800 hover:bg-black hover:scale-[1.1] trans-slow  border-dotted p-4'>
                <AiOutlinePlusSquare color='white' size={24} />
                <div className=' text-white'>
                    Upload
                </div>

            </div>

        </div>
    );

    const checkFileType = (file) => { return file?.type.includes('video') ? false : true }


    const postType = ['Video', 'Image', 'Text']
    const [selectedPostType, setSelectedPostType] = useState('Image')

    return (
        <div className=' flex flex-col text-black items-center'>
            <div className='relative w-full center '>
                <div className='center absolute w-full m-auto top-4 gap-2'>
                    {forthis == 'post' && postType.map((type, index) => {
                        return (
                            <Button onPress={() => { setSelectedPostType(type) }} className={`${selectedPostType == type ? 'bg-green-400' : 'bg-white'}  center min-w-fit z-10 rounded-full w-12 h-8 `}>
                                {type == 'Video' ? (<Video />) : type == 'Image' ? (<Image />) : type == 'Text' ? (<Text />) : <AiOutlineQuestion />}
                            </Button>


                        )
                    })}

                </div>

                {selectedPostType == 'Image' &&
                    <ImgCrop beforeCrop={checkFileType} showGrid aspectSlider showReset aspect rotationSlider
                        modalClassName={`text-black z-[999999999] `}
                        fillColor='black'
                        modalOk={'OK'}
                        modalTitle='Crop post'
                        cropShape={inCricle ? 'round' : 'rect'}


                    >


                        <Upload
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
                }

                {selectedPostType == 'Video' &&
                    <Upload
                        className=' relative'
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        fileList={fileList}
                        showUploadList={false}
                        onPreview={''}
                        onChange={handleChange}
                        accept="video/*"
                        maxCount={limit ? limit : 8}
                        multiple


                    >
                        {fileList.length >= limit ? null : uploadButton}
                    </Upload>

                }

                {selectedPostType == 'Text' &&
                    <div className='mt-12 center-col'>
                        <Textarea rows={3} className='h-40 w-72' onValueChange={(text) => {
                            handleCaption(text)
                            setter(old => { return ({ ...old, post: { img: [text] } }) })


                        }} />

                        <h1 className='flex gap-2'>{post?.tags?.map((tag) => {
                            return (
                                <div>{tag}</div>
                            )
                        })}</h1>

                        <Button onPress={() => {
                            setter(old => { return ({ ...old, postType: 'txt' }) })

                            submitPost()

                        }} className='w-3/4'>

                        </Button>
                    </div>

                }

            </div>
            {
                FileType && <div className={`${inCricle ? 'rounded-full h-32 w-32' : 'rounded-3xl w-96 h-72'} z-50 overflow-y-scroll hidescroll    text-white  `}>
                    <Skeleton className='w-full border-2 h-full' isLoaded={showPreview}>
                        {FileType?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={showPreview} alt="" />}
                        {FileType?.includes('image') && <img className='w-full  object-cover' src={showPreview} alt="" />}

                    </Skeleton>
                </div>
            }




        </div>
    );
};