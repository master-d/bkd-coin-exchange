package com.bigpaper.repos;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.AssetType;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface AssetTypeRepository extends CrudRepository<AssetType, String> {

}
// end::code[]
