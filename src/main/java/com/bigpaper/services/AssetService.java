package com.bigpaper.services;


import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.bigpaper.bo.Asset;
import com.bigpaper.repos.AssetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetService {

    private static Map<Long, Asset> assetMap = null;
    private static List<Asset> assetList = null;

    @Autowired
    private AssetRepository assetRepo;

    public AssetService() { }

    public Map<Long, Asset> getAssetMap() {
        if (assetMap == null)
            populateAssets();
        return assetMap;
    }
    public List<Asset> getAssetList() {
        if (assetMap == null)
            populateAssets();
        return assetList;
    }
    public Asset getAssetById(Long id) {
        Map<Long, Asset> assets = getAssetMap();
        return assets.get(id);
    }
    public String getAssetNameById(Long id) {
        Map<Long, Asset> assets = getAssetMap();
        return assets.get(id).getName();
    }

    private void populateAssets() {
        assetList = new LinkedList<>();
        assetMap = new HashMap<>();
        for (Asset a: assetRepo.findAll()) {
            assetList.add(a);
            assetMap.put(a.getId(), a);
        }
    }
}
