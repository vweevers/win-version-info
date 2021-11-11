{
    "targets": [{
        "target_name": "VersionInfo",
        "conditions": [
            ["OS == 'win'", {
                "sources": [
                    "src/VersionInfo.cc",
                    "src/showver.cc"
                ],
                "include_dirs" : [
                    "<!(node -e \"require('napi-macros')\")",
                    "deps/UTF8Conversion"
                ],
                "libraries": [
                    "-lversion.lib"
                ],
                "msvs_settings": {
                    "VCCLCompilerTool": {
                        "RuntimeTypeInfo": "false",
                        "ExceptionHandling": 1,
                        "DisableSpecificWarnings": [ "4355", "4530" ,"4267", "4244", "4506" ]
                    }
                },
                "configurations": {
                    "Release": {
                        "msvs_settings": {
                            "VCCLCompilerTool": {
                                "ExceptionHandling": 1
                            }
                        }
                    }
                }
            }]
        ]
    }]
}
