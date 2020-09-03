import path from "path";

const config = {
  projectName: "pxp_mini_pro",
  date: "2020-7-1",
  designWidth: 750,
  deviceRatio: {
    "640": 2.34 / 2,
    "750": 1,
    "828": 1.81 / 2
  },
  sourceRoot: "src",
  outputRoot: "dist",
  babel: {
    sourceMap: true,
    presets: [
      [
        "env",
        {
          modules: false
        }
      ]
    ],
    plugins: [
      "transform-decorators-legacy",
      "transform-class-properties",
      "transform-object-rest-spread",
      [
        "transform-runtime",
        {
          helpers: false,
          polyfill: false,
          regenerator: false,
          moduleName: "babel-runtime"
        }
      ]
    ]
  },
  plugins: ["@tarojs/plugin-sass", "@tarojs/plugin-terser"],
  defineConstants: {},
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
        }
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 5*1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: ["last 3 versions", "Android >= 4.1", "ios >= 8"]
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]"
        }
      }
    }
  },
  alias: {
    "@/components": path.resolve(__dirname, "..", "src/components"),
    "@/utils": path.resolve(__dirname, "..", "src/utils"),
    "@/assets": path.resolve(__dirname, "..", "src/assets"),
    "@/package": path.resolve(__dirname, "..", "package.json"),
    "@/project": path.resolve(__dirname, "..", "project.config.json"),
    '@/global_api': path.resolve(__dirname, '..', 'src/global_api'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '@/actions': path.resolve(__dirname, '..', 'src/actions')
    
  }
};

module.exports = function(merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
