import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from "react";
import { AiFillMoneyCollect, AiOutlinePlusSquare, AiOutlineQuestion } from "react-icons/ai";
import { useUploader } from '../../Hooks/useUploader';
import { Button, Skeleton, Textarea } from '@nextui-org/react';
import { Image, Text, Video } from 'lucide-react';
import LoaddingMask from './LoadingMask';
import { BsBagPlusFill } from "react-icons/bs";

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export const Uploader = ({ setter, folderName, limit, setPostType, post, inCricle, forthis, submitPost, handleCaption, setForProduct, setterArray }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const [fileListURL, setFileListURL] = useState([])
    const handleCancel = () => setPreviewOpen(false);
    const [showPreview, setShowPreview] = useState([])
    const [FileType, setFileType] = useState('')
    const [loading, setLoading] = useState(false)

    const postType = ['Video', 'Image', 'Text', 'Product']
    const [selectedPostType, setSelectedPostType] = useState('Image')



    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = async ({ file, fileList }) => {
        setLoading(true)
        if (file.status === 'done') {
            setFileType(file.type)
            setter(old => { return ({ ...old, postType: file.type }) })
            const fileURL = await useUploader(file.originFileObj, folderName)
            if (fileURL) setFileListURL(old => [...old, fileURL])
            if (setterArray && selectedPostType == 'Product') setterArray(old => { return ({ ...old, media: [...old?.media, { url: fileURL, type: file.type }] }) })

        } else if (file.status === 'error') {
            file.status = 'done'
            setter(old => { return ({ ...old, postType: file.type }) })
            setFileType(file.type)
            const fileURL = await useUploader(file.originFileObj, folderName)
            if (setterArray && selectedPostType == 'Product') setterArray(old => { return ({ ...old, media: [...old?.media, { url: fileURL, type: file.type }] }) })

            if (fileURL) setFileListURL(old => [...old, fileURL])
        }


        setLoading(false)


        setFileList(fileList)



    }

    useEffect(() => {
        fileListURL.reverse()
        fileList.reverse()
        // setter(old => { return ({ ...old, post: { img: fileListURL } }) })
    }, [])

    useEffect(() => {
        setter(old => { return ({ ...old, post: { img: fileListURL } }) })
        //if (setterArray && selectedPostType == 'Product') setterArray(old => { return ({ ...old, media: showPreview }) })

    }, [fileList, fileListURL])


    useEffect(() => {
        if (selectedPostType == 'Product') {
            if (setForProduct) setForProduct(postType)
        } else {
            if (setForProduct) setForProduct(false)
        }
    }, [selectedPostType])


    useEffect(() => {

        setFileType(fileList[0]?.type)
        if (setPostType) setPostType(fileList[0]?.type)
        setShowPreview((selectedPostType == 'Product') ? fileListURL.map((item, index) => {
            return ({ url: item, type: fileList[index].type })

        }) : fileListURL[0])



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




    return (
        <div className=' flex flex-col text-black items-center '>
            {loading && <LoaddingMask lable='uploading' />}
            <div className='relative w-full center '>
                <div className='grid grid-cols-3  absolute w-full   m-auto top-4 gap-2'>
                    {forthis == 'post' && postType.map((type, index) => {
                        return (
                            <Button key={index} onPress={() => { setFileList([]); setSelectedPostType(type); setShowPreview([]) }} className={`${selectedPostType == type ? 'bg-green-400' : 'bg-white'} m-auto  center min-w-fit z-10 rounded-full w-12 h-8 `}>
                                {type == 'Video' ? (<Video />) : type == 'Image' ? (<Image />) : type == 'Text' ? (<Text />) : type == 'Product' ? <BsBagPlusFill size={24} /> : <AiOutlineQuestion />}
                            </Button>


                        )
                    })}

                </div>

                {(selectedPostType == 'Image') &&
                    <ImgCrop beforeCrop={checkFileType} showGrid showReset rotationSlider
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
                            accept="image/*"
                            maxCount={limit ? limit : 8}
                            multiple={limit > 1}


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
                        multiple={limit > 1}


                    >
                        {fileList.length >= limit ? null : uploadButton}
                    </Upload>

                }
                {selectedPostType == 'Product' &&

                    <ImgCrop beforeCrop={checkFileType} showGrid showReset rotationSlider
                        modalClassName={`text-black z-[999999999] `}
                        fillColor='black'
                        modalOk={'OK'}
                        modalTitle='Crop post'
                        cropShape={inCricle ? 'round' : 'rect'}


                    >
                        <Upload
                            className='relative center scale-50'
                            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                            fileList={fileList}
                            showUploadList={false}
                            onPreview={''}
                            onChange={handleChange}
                            accept="image/*"
                            maxCount={8}




                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                    </ImgCrop>


                }

                {selectedPostType == 'Text' &&
                    <div className='mt-24 center-col'>
                        <Textarea rows={3} className='h-auto max-h-40 w-72 ' onValueChange={(text) => {
                            handleCaption(text)
                            setter(old => { return ({ ...old, post: { img: [text] } }) })


                        }} />

                        <div className='flex flex-wrap gap-2 h-auto max-h-40 overflow-y-scroll hidescroll my-2'>{[...new Set(post?.tags)]?.map((tag) => {
                            return (
                                <div className='text-white '>{tag}</div>
                            )
                        })}</div>

                        <Button onPress={() => {
                            setter(old => { return ({ ...old, postType: 'txt' }) })

                            submitPost()

                        }} className='w-3/4'>
                            Post
                        </Button>
                    </div>

                }

            </div>

            {(FileType && selectedPostType != 'Product') && <div className={`${inCricle ? 'rounded-full h-32 w-32' : selectedPostType == 'Product' ? 'rounded-3xl h-20 w-20' : 'rounded-3xl w-96 h-72'} z-50 overflow-y-scroll hidescroll    text-white  `}>
                <Skeleton className='w-full border-2 h-full' isLoaded={showPreview}>
                    {FileType?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={showPreview} alt="" />}
                    {FileType?.includes('image') && <img className='w-full  object-cover' src={showPreview} alt="" />}

                </Skeleton>
            </div>}

            {selectedPostType == 'Product' && <div className={`${showPreview?.length >= 8 ? ' mt-24 ' : ''} grid grid-cols-4 gap-2 trans z-50 overflow-y-scroll hidescroll mb-4`}>
                {showPreview?.map(img => {
                    return (
                        <div className={`${showPreview.length >= 8 ? ' first-line:mt-20' : selectedPostType == 'Product' ? 'rounded-3xl h-20 w-20' : 'rounded-3xl w-96 h-72'}    text-white  `}>
                            <Skeleton className='w-full border-2 h-full' isLoaded={showPreview}>
                                {img?.type?.includes('video') && <video autoPlay muted playsInline loop className='w-full  object-cover' src={img.url} alt="" />}
                                {img?.type?.includes('image') && <img className='w-full  object-cover' src={img.url} alt="" />}

                            </Skeleton>
                        </div>
                    )
                })}
            </div>}







        </div>
    );
};