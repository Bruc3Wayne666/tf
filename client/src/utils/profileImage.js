export const checkImage = file => {
    console.log(file)
    let err
    if (!file) return err = 'File doesn\'t exist'
    if (file.size > 1024 * 1024) err = 'Image should be less than 1MB'
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') err = 'Wrong image extension'
    return err
}

export const uploadImage = async images => {
    let imgs = []
    for (const image of images) {
        const formData = new FormData()

        if(image.camera){
            formData.append("file", image.camera)
        }else{
            formData.append("file", image)
        }

        formData.append('upload_preset', 'coohws1x')
        formData.append('cloud_name', 'dgycmp3pc')
        formData.append('api_key', '225698422944494')

        const res = await fetch('https://api.cloudinary.com/v1_1/talkfield/upload', {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        imgs.push({public_id: data.public_id, url: data.secure_url})
    }
    return imgs
}