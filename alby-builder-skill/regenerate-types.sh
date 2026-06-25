# TODO: clone the repos and build them
cp ../js-sdk/dist/types/nwc.d.ts ./references/nwc-client
cp ../js-lightning-tools/dist/types/index.d.ts ./references/lightning-tools

# For bitcoin connect, also run "yarn dts" to create the typescript bundle
(cd ../bitcoin-connect && yarn dts)
cp ../bitcoin-connect/dist/bundle.d.ts ./references/bitcoin-connect
(cd ../bitcoin-connect/react && yarn dts)
cp ../bitcoin-connect/react/dist/bundle.d.ts ./references/bitcoin-connect/react.bundle.d.ts