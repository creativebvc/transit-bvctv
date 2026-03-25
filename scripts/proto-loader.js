// Proto definition inlined as a string.
// Uses protobuf.parse() so the full parser bundle is NOT needed —
// this works with the much smaller protobuf.min.js (minimal build).
// No file fetch, no path issues, no size problems on TV browsers.

var GTFSRT_ROOT = null;

var GTFS_PROTO_STRING = 'syntax = "proto2"; package transit_realtime;' +
  'message FeedMessage {' +
  '  required FeedHeader header = 1;' +
  '  repeated FeedEntity entity = 2;' +
  '}' +
  'message FeedHeader {' +
  '  required string gtfs_realtime_version = 1;' +
  '  optional uint64 timestamp = 3;' +
  '}' +
  'message FeedEntity {' +
  '  required string id = 1;' +
  '  optional bool is_deleted = 2 [default = false];' +
  '  optional TripUpdate trip_update = 3;' +
  '  optional Alert alert = 5;' +
  '}' +
  'message TripUpdate {' +
  '  required TripDescriptor trip = 1;' +
  '  repeated StopTimeUpdate stop_time_update = 2;' +
  '  message StopTimeEvent {' +
  '    optional int64 time = 2;' +
  '  }' +
  '  message StopTimeUpdate {' +
  '    optional string stop_id = 4;' +
  '    optional StopTimeEvent arrival = 2;' +
  '    optional StopTimeEvent departure = 3;' +
  '  }' +
  '}' +
  'message Alert {' +
  '  repeated EntitySelector informed_entity = 5;' +
  '  optional TranslatedString header_text = 10;' +
  '}' +
  'message TripDescriptor {' +
  '  optional string trip_id = 1;' +
  '  optional string route_id = 5;' +
  '}' +
  'message EntitySelector {' +
  '  optional string route_id = 2;' +
  '}' +
  'message TranslatedString {' +
  '  repeated Translation translation = 1;' +
  '  message Translation {' +
  '    required string text = 1;' +
  '    optional string language = 2;' +
  '  }' +
  '}';

function loadGTFSRTProto() {
    if (GTFSRT_ROOT) return Promise.resolve(GTFSRT_ROOT);
    try {
        var parsed = protobuf.parse(GTFS_PROTO_STRING);
        GTFSRT_ROOT = parsed.root;
        console.log('✅ GTFS-RT Proto parsed (inline)');
        return Promise.resolve(GTFSRT_ROOT);
    } catch (e) {
        console.error('❌ Failed to parse inline proto:', e);
        return Promise.resolve(null);
    }
}
