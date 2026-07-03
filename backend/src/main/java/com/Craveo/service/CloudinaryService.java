package com.Craveo.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) throws Exception {

        System.out.println("===== CLOUDINARY UPLOAD START =====");

        Map uploadResult = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.emptyMap()
        );

        System.out.println(uploadResult);

        String url = uploadResult.get("secure_url").toString();

        System.out.println("Cloudinary URL = " + url);

        return url;
    }
}
