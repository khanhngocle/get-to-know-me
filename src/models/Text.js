import React, { useEffect, useState } from "react";

import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { Text } from "@react-three/drei";

// Change these two lines to change the big 3D text on the wall
const NAME_LINE = "I'm Khanh.";
const SUB_LINE = "Finance & AI Enthusiast";

export function TextHeaders({ materials, nodes }) {
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);

  const pX = [
    [-0.83, 1.18, 0.73],
    [-0.83, 0.95, 0.14],
    [-0.83, 0.87, 0.14],
    [0.21, 0.41, -0.9],
  ];

  const sProps = useSpring({
    pos0: active ? pX[0] : [pX[0][0] - 1, pX[0][1], pX[0][2]],
    pos1: active1 ? pX[1] : [pX[1][0] - 1, pX[1][1], pX[1][2]],
    pos2: active2 ? pX[2] : [pX[2][0] - 1, pX[2][1], pX[2][2]],
    pos3: active3 ? pX[3] : [pX[3][0], pX[3][1], pX[3][2] - 0.5],
    config: { mass: 20, tension: 400, friction: 200, precision: 0.0001 },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
    }, 250);
    setTimeout(() => {
      setActive1(true);
    }, 750);
    setTimeout(() => {
      setActive2(true);
    }, 1000);
    setTimeout(() => {
      setActive3(true);
    }, 1500);
  }, []);

  return (
    <group>
      <a.mesh
        material={materials.Default_Color}
        geometry={nodes.Hello.geometry}
        position={sProps.pos0}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <a.group position={sProps.pos1} rotation={[0, Math.PI / 2, 0]}>
        <Text
          fontSize={0.105}
          anchorX="left"
          anchorY="bottom-baseline"
          material={materials.Default_Color}
        >
          {NAME_LINE}
        </Text>
      </a.group>
      <a.group position={sProps.pos2} rotation={[0, Math.PI / 2, 0]}>
        <Text
          fontSize={0.06}
          anchorX="left"
          anchorY="bottom-baseline"
          material={materials.Default_Color}
        >
          {SUB_LINE}
        </Text>
      </a.group>
      <a.mesh
        geometry={nodes.Look_Around.geometry}
        material={materials.Default_Color}
        position={sProps.pos3}
        rotation={[1.56, 0, 0]}
      />
    </group>
  );
}