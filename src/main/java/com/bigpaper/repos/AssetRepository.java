package com.bigpaper.repos;

import org.springframework.data.repository.CrudRepository;

import com.bigpaper.bo.Asset;

/**
 * @author Rob Richards
 */
// tag::code[]
public interface AssetRepository extends CrudRepository<Asset, Long> {

}
// end::code[]
