{
  "targets": [
    {
      "target_name": "xattr",
      "sources": [
        "src/async.cc",
        "src/error.cc",
        "src/sync.cc",
        "src/util.cc",
        "src/xattr.cc"
      ],
      "include_dirs" : [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
