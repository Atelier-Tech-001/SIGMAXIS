import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying SigmaxisNFT contract to Polygon Mumbai...");

  // 1. Obtener el contrato
  const SigmaxisNFT = await ethers.getContractFactory("SigmaxisNFT");

  // 2. Desplegar contrato
  const sigmaxisNFT = await SigmaxisNFT.deploy();
  await sigmaxisNFT.deployed();

  console.log(`✅ SigmaxisNFT deployed to: ${sigmaxisNFT.address}`);

  // 3. Opcional: Mint inicial de prueba (puedes comentar si no quieres)
  const [deployer] = await ethers.getSigners();
  const testURI = "ipfs://QmExampleMetadataHash";
  const mintTx = await sigmaxisNFT.mintWithURI(deployer.address, testURI);
  await mintTx.wait();

  console.log(`🎨 Minted NFT to ${deployer.address} with URI: ${testURI}`);
}

// Ejecutar y capturar errores
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
