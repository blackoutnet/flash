const config = {
  manifests: {
    release: 'https://raw.githubusercontent.com/commaai/openpilot/release3/system/hardware/tici/all-partitions.json',
    master: 'https://raw.githubusercontent.com/commaai/openpilot/master/system/hardware/tici/all-partitions.json',
  },
  loader: {
    url: '/qdl/programmer.bin',
  },
}

export default config
