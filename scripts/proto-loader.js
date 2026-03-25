var GTFSRT_ROOT = null;

function loadGTFSRTProto() {
    if (GTFSRT_ROOT) return Promise.resolve(GTFSRT_ROOT);
    return protobuf.load("scripts/gtfs-realtime.proto").then(function(root) {
        GTFSRT_ROOT = root;
        console.log('✅ GTFS-RT Proto Loaded');
        return root;
    }).catch(function(e) {
        console.error('❌ Failed to load proto:', e);
        return null;
    });
}
