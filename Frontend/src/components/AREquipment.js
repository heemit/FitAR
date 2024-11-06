import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useLocation } from 'react-router-dom';

const AREquipment = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const location = useLocation();
  const { selectedModel } = location.state || {};

  // Models and textures data
  const modelData = {
    'Barbells and Weight Plates': {
      model: '/models/Barbells_WeightPlates.glb',
      textures: ['/textures/Handle-Normal.png', '/textures/Handle-Roughness.png'],
    },
    'Ab Wheels': {
      model: '/models/Ab_Wheels.glb',
      textures: ['/textures/Ab_Roller.png'],
    },
    'Kettlebells': {
      model: '/models/Kettlebells.glb',
      textures: [
        '/textures/KettlebellNormal.png',
        '/textures/KettlebellAlbedo.png',
        '/textures/KettlebellMetal.png',
        '/textures/KettlebellRough.png',
        '/textures/internal_ground_ao_texture_(2).jpeg',
        '/textures/KettlebellAO.jpg',
      ],
    },
    'Smartwatches': {
      model: '/models/Smartwatches.glb',
      textures: ['/textures/46-2-android-w1-i-kall-yes-original-imag87q7e7tuganr_1.png'],
    },
    'Dumbbells': {
      model: '/models/Dumbbells.obj',
      textures: ['/textures/dumbell.jpg'],
    },
    'Medicine Balls': {
      model: '/models/Medicine_Balls.glb',
      textures: [
        '/textures/gltf_embedded_1@channels=R.png',
        '/textures/gltf_embedded_0.png',
        '/textures/gltf_embedded_1@channels=B.png',
        '/textures/gltf_embedded_1@channels=G.png',
        '/textures/gltf_embedded_2.png',
      ],
    },
    'Pull-up Bars': {
      model: '/models/Pull-up_Bars.glb',
      textures: [
        '/textures/pull_up_bar_low_BaseColor.1001.jpg',
        '/textures/pull_up_bar_low_Height.1001.jpg',
        '/textures/pull_up_bar_low_Metalness.1001.jpg',
        '/textures/pull_up_bar_low_Normal.1001.jpg',
        '/textures/pull_up_bar_low_Opacityt.1001.jpg',
        '/textures/pull_up_bar_low_Roughness.1001.jpg',
      ],
    },
    'Stationary Bikes': {
      model: '/models/Stationary_Bikes.glb',
      textures: ['/textures/stationary_bike.jpg'],
    },
    'Treadmills': {
      model: '/models/Treadmills.glb',
      textures: [
        '/textures/aluminio_metallic.jpeg',
        '/textures/aluminio_normal.png',
        '/textures/aluminio_roughness.jpeg',
        '/textures/caminadora_aluminio_AlbedoTransparency.png',
        '/textures/caminadora_plastico_negro_AlbedoTransparen.png',
        '/textures/caucho_negro_albedo.jpeg',
        '/textures/caucho_negro_metallic.jpeg',
        '/textures/caucho_negro_normal.png',
        '/textures/caucho_negro_roughness.jpeg',
        '/textures/internal_ground_ao_texture.jpeg',
        '/textures/pasta_roja_albedo.jpeg',
        '/textures/pasta_roja_metallic.jpeg',
        '/textures/pasta_roja_normal.png',
        '/textures/pasta_roja_roughness.jpeg',
        '/textures/plastic_white_albedo.jpeg',
        '/textures/plastic_white_metallic.jpeg',
        '/textures/plastic_white_normal.png',
        '/textures/plastic_white_roughness.jpeg',
        '/textures/plastico_negro_metallic.jpeg',
        '/textures/plastico_negro_normal.png',
        '/textures/plastico_negro_roughness.jpeg',
      ],
    },
  };

  // Start the camera when the component mounts
  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      renderModel();
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert(`Could not access the camera: ${err.message}`);
    }
  };

  const renderModel = () => {
    if (selectedModel && modelData[selectedModel]) {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
      camera.position.set(0, 0, 2); // Adjust camera position

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(800, 600);

      if (!rendererRef.current.hasChildNodes()) {
        rendererRef.current.appendChild(renderer.domElement);
      }

      const light = new THREE.AmbientLight(0xffffff, 1);
      scene.add(light);

      const modelInfo = modelData[selectedModel];
      const loader = modelInfo.model.endsWith('.obj') ? new OBJLoader() : new GLTFLoader();

      loader.load(
        modelInfo.model,
        (gltf) => {
          const model = gltf.scene || gltf;
          model.position.set(0, -0.5, 0);
          model.scale.set(1.5, 1.5, 1.5);
          scene.add(model);

          const textureLoader = new THREE.TextureLoader();
          modelInfo.textures.forEach((texturePath) => {
            const texture = textureLoader.load(texturePath, () => {
              model.traverse((child) => {
                if (child.isMesh && !child.material.map) {
                  child.material.map = texture;
                  child.material.needsUpdate = true;
                }
              });
            });
          });

          const videoTexture = new THREE.VideoTexture(videoRef.current);
          scene.background = videoTexture;

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableZoom = false;

          const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          };
          animate();
        },
        undefined,
        (error) => {
          console.error("Error loading 3D model: ", error);
        }
      );
    }
  };

  useEffect(() => {
    startCamera();
    
    return () => {
      const videoElement = videoRef.current;
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <h2>Visualize AR Equipment - {selectedModel}</h2>
      {isCameraActive && (
        <div style={{ width: '800px', height: '600px', position: 'relative' }}>
          <video ref={videoRef} autoPlay style={{ display: 'none' }} />
          <div ref={rendererRef} style={{ position: 'absolute', top: 0, left: 0, width: '800px', height: '600px' }} />
        </div>
      )}
    </div>
  );
};

export default AREquipment;