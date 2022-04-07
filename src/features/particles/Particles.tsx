import { Canvas } from '@react-three/fiber';
import { Suspense, VoidFunctionComponent } from 'react';
import { Provider, ReactReduxContext } from 'react-redux';
import { useMobileDetect } from '../../lib/hooks';
import ParticlesScene from './ParticlesScene';

export interface ParticlesProps {
  colorThreshold?: number;
  picture: string;
}

const Particles: VoidFunctionComponent<ParticlesProps> = ({ colorThreshold = 34, picture }) => {
  const isMobile = useMobileDetect();

  return (
    <ReactReduxContext.Consumer>
      {({ store }) => (
        <Canvas
          camera={{
            fov: 50,
            aspect: window.innerWidth / window.innerHeight,
            near: 1,
            far: 10000,
            position: [0, 0, 300],
          }}
          gl={{
            antialias: true,
            alpha: true,
          }}
        >
          <Provider store={store}>
            <Suspense fallback={null}>
              <ParticlesScene
                colorThreshold={colorThreshold}
                picture={picture}
                scaleCoefficient={isMobile ? 0.7 : 1}
              />
            </Suspense>
          </Provider>
        </Canvas>
      )}
    </ReactReduxContext.Consumer>
  );
};

export default Particles;
