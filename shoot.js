AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera-rig");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y+1.6,
          z: pos.z-0.08,
        });

        var camera = document.querySelector("#camera").object3D;

        //Obtener la dirección de la cámara como un vector de Three.js
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //Establecer la velocidad y su dirección
        bullet.setAttribute("velocity", direction.multiplyScalar(-20));

        var scene = document.querySelector("#scene");

        //Establecer la bala como una entidad dinámica
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });
        bullet.setAttribute("visible", false);

        //Agregar un escucha de eventos de colisión a la bala
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);

        //Sonido de disparo
        this.shootSound();
      }
    });
  },
  removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    //Elemento de la bala
    var element = e.detail.target.el;

    //Elemento que es golpeado
    var elementHit = e.detail.body.el;

    //Crear una mancha de pintura
    var paint = document.createElement("a-entity");
    var pos = element.getAttribute("position")
    var rotate = elementHit.getAttribute("rotation")

    //Establecer la posición, rotación y escala
    paint.setAttribute("position", {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
    paint.setAttribute("rotation", {
      x: rotate.x,
      y: rotate.y,
      z: rotate.z,
    });
    paint.setAttribute("scale", {
      x: 2,
      y: 2,
      z: 2,
    });

    //Seleccionar la imagen de la mancha de forma aleatoria
    var colorNum = parseInt(Math.random() * 8 + 1)

    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./images/paint splash-0" + colorNum + ".png"
    });

    paint.setAttribute("geometry", {
      primitive: "plane",
      width: 0.5,
      height: 0.5
    });
    scene.appendChild(paint)

    //Eliminar escucha de evento
    element.removeEventListener("collide", this.removeBullet);

    //Remover las balas de la escena     
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});

