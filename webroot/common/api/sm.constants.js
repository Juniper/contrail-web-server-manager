/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

var smConstants = {};

smConstants.REDIS_TAG_VALUES = 'tagValues';
smConstants.REDIS_CACHE_EXPIRE = 3600;


smConstants.ALLOWED_FORWARDING_PARAMS = ['id', 'tag', 'cluster_id'];

// Export this as a module.
module.exports = smConstants;