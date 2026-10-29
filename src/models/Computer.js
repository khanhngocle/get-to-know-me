import React, { useEffect, useState, useRef } from "react";

import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

const defaultConfig = {
  mass: 5,
  tension: 400,
  friction: 150,
  precision: 0.0001,
};

function OverlayContent() {
  return (
    <>
      <h1 className="title">Why You Should Hire Me</h1>
      <div className="tile-grid">
        <div className="tile">
          <div className="tile-content">
            Solid background with proven academic results <br />
            <span className="description">
              Full ride scholarship at Radboud University and
              Honored Graduate (top 1% of 1,800) at Foreign
              Trade University, plus hands-on experience in
              banking at VPBank and venture capital at Primus
              Spark Ventures.
            </span>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            Eager to learn and result driven <br />
            <span className="description">
              I pick up new skills fast, from credit analysis
              to valuation to coding this website, and I focus
              on delivering results the team can use.
            </span>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            Tech and AI readiness <br />
            <span className="description">
              Advanced Excel, STATA and SPSS, curious about
              how AI is changing finance, and I built this 3D
              website myself.
            </span>
          </div>
        </div>
        <div className="tile">
          <div className="tile-content">
            Please give me a chance <br />
            <span className="description">
              Open to internships and graduate roles in the Netherlands.
              I am ready to learn, contribute and grow with your team.
            </span>
          </div>
          <div className="tile-bottom">
            <a href="mailto:aurora.khanhle@gmail.com" target="new">
              Email
            </a>
            <a href="./cv.pdf" target="new">
              CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export function Computer({ materials, nodes, setItems }) {
  const [label, setLabel] = useState(false);
  const [active, setActive] = useState(false);
  const allowAnimation = useRef(false);

  const sProps = useSpring({
    rot: active ? [0, 0, 0] : [0, 0, -1.8],
    config: defaultConfig,
  });

  const ani = useSpring({
    rot2: label ? [0, 0, -0.2] : [0, 0, 0],
    config: {
      mass: 0.1,
      tension: 50,
      friction: 10,
      precision: 0.0001,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      setActive(true);
      allowAnimation.current = true;
    }, 1000);
  }, []);

  useEffect(() => {
    document.body.style.cursor = label ? "pointer" : "auto";
  }, [label]);

  return (
    <group>
      <group
        onPointerEnter={() => {
          if (allowAnimation.current) setLabel(true);
        }}
        onPointerLeave={() => {
          if (allowAnimation.current) setLabel(false);
        }}
        onClick={() => {
          if (allowAnimation.current) setItems(<OverlayContent />);
        }}
      >
        <mesh
          material={materials.Default_White}
          geometry={nodes.Computer_1.geometry}
        />
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Computer_2.geometry}
        />
        <mesh
          material={materials.Default_White}
          geometry={nodes.Cube.geometry}
        />
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Cube_1.geometry}
        />
        <a.group position={[-0.713, 0.545, -0.14]} rotation={sProps.rot}>
          <a.mesh
            material={materials.Default_White}
            geometry={nodes.Lid_1.geometry}
            rotation={ani.rot2}
          />
          <a.mesh
            material={materials.Default_Color}
            geometry={nodes.Lid_2.geometry}
            rotation={ani.rot2}
          />
        </a.group>
        <mesh material={nodes.Hinge.material} geometry={nodes.Hinge.geometry} />
      </group>

      <group visible={label}>
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Laptop_Label_1.geometry}
        />
        <mesh
          material={materials.Default_White}
          geometry={nodes.Laptop_Label_2.geometry}
        />
        <mesh
          material={materials.Default_Color}
          geometry={nodes.Laptop_Text.geometry}
          position={[-0.64, 0.73, -0.19]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        >
          <mesh
            material={materials.Default_Color}
            geometry={nodes.Laptop_CTV.geometry}
            position={[0.01, 0, 0.04]}
          />
        </mesh>
      </group>
    </group>
  );
}
