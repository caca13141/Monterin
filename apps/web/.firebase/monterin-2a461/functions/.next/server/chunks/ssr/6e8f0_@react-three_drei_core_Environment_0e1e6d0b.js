module.exports=[75636,49893,295,a=>{"use strict";var b=a.i(16429),c=a.i(22767),d=a.i(17344),e=a.i(53059),f=a.i(57530),f=f,g=f,h=a.i(85044),i=a.i(10730),j=i,k=a.i(78980);class l extends j.Mesh{constructor(a,b){var c,d;const e=(a=>a&&a.isCubeTexture)(a),f=Math.floor(Math.log2((null!=(d=e?null==(c=a.image[0])?void 0:c.width:a.image.width)?d:1024)/4)),g=Math.pow(2,f),h=3*Math.max(g,112),i=`
        varying vec3 vWorldPosition;
        void main() 
        {
            vec4 worldPosition = ( modelMatrix * vec4( position, 1.0 ) );
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
        `,l=[e?"#define ENVMAP_TYPE_CUBE":"",`#define CUBEUV_TEXEL_WIDTH ${1/h}`,`#define CUBEUV_TEXEL_HEIGHT ${1/(4*g)}`,`#define CUBEUV_MAX_MIP ${f}.0`].join("\n")+`
        #define ENVMAP_TYPE_CUBE_UV
        varying vec3 vWorldPosition;
        uniform float radius;
        uniform float height;
        uniform float angle;
        #ifdef ENVMAP_TYPE_CUBE
            uniform samplerCube map;
        #else
            uniform sampler2D map;
        #endif
        // From: https://www.shadertoy.com/view/4tsBD7
        float diskIntersectWithBackFaceCulling( vec3 ro, vec3 rd, vec3 c, vec3 n, float r ) 
        {
            float d = dot ( rd, n );
            
            if( d > 0.0 ) { return 1e6; }
            
            vec3  o = ro - c;
            float t = - dot( n, o ) / d;
            vec3  q = o + rd * t;
            
            return ( dot( q, q ) < r * r ) ? t : 1e6;
        }
        // From: https://www.iquilezles.org/www/articles/intersectors/intersectors.htm
        float sphereIntersect( vec3 ro, vec3 rd, vec3 ce, float ra ) 
        {
            vec3 oc = ro - ce;
            float b = dot( oc, rd );
            float c = dot( oc, oc ) - ra * ra;
            float h = b * b - c;
            
            if( h < 0.0 ) { return -1.0; }
            
            h = sqrt( h );
            
            return - b + h;
        }
        vec3 project() 
        {
            vec3 p = normalize( vWorldPosition );
            vec3 camPos = cameraPosition;
            camPos.y -= height;
            float intersection = sphereIntersect( camPos, p, vec3( 0.0 ), radius );
            if( intersection > 0.0 ) {
                
                vec3 h = vec3( 0.0, - height, 0.0 );
                float intersection2 = diskIntersectWithBackFaceCulling( camPos, p, h, vec3( 0.0, 1.0, 0.0 ), radius );
                p = ( camPos + min( intersection, intersection2 ) * p ) / radius;
            } else {
                p = vec3( 0.0, 1.0, 0.0 );
            }
            return p;
        }
        #include <common>
        #include <cube_uv_reflection_fragment>
        void main() 
        {
            vec3 projectedWorldPosition = project();
            
            #ifdef ENVMAP_TYPE_CUBE
                vec3 outcolor = textureCube( map, projectedWorldPosition ).rgb;
            #else
                vec3 direction = normalize( projectedWorldPosition );
                vec2 uv = equirectUv( direction );
                vec3 outcolor = texture2D( map, uv ).rgb;
            #endif
            gl_FragColor = vec4( outcolor, 1.0 );
            #include <tonemapping_fragment>
            #include <${k.version>=154?"colorspace_fragment":"encodings_fragment"}>
        }
        `,m={map:{value:a},height:{value:(null==b?void 0:b.height)||15},radius:{value:(null==b?void 0:b.radius)||100}};super(new j.IcosahedronGeometry(1,16),new j.ShaderMaterial({uniforms:m,fragmentShader:l,vertexShader:i,side:j.DoubleSide}))}set radius(a){this.material.uniforms.radius.value=a}get radius(){return this.material.uniforms.radius.value}set height(a){this.material.uniforms.height.value=a}get height(){return this.material.uniforms.height.value}}var m=a.i(15523);function n(a,b,c,d,e={}){var f,h,i,j,k;let l;e={backgroundBlurriness:0,backgroundIntensity:1,backgroundRotation:[0,0,0],environmentIntensity:1,environmentRotation:[0,0,0],...e};let m=(l=k=b||c).current&&l.current.isScene?k.current:k,o=m.background,p=m.environment,q={backgroundBlurriness:m.backgroundBlurriness,backgroundIntensity:m.backgroundIntensity,backgroundRotation:null!=(f=null==(h=m.backgroundRotation)||null==h.clone?void 0:h.clone())?f:[0,0,0],environmentIntensity:m.environmentIntensity,environmentRotation:null!=(i=null==(j=m.environmentRotation)||null==j.clone?void 0:j.clone())?i:[0,0,0]};return"only"!==a&&(m.environment=d),a&&(m.background=d),(0,g.s)(m,e),()=>{"only"!==a&&(m.environment=p),a&&(m.background=o),(0,g.s)(m,q)}}function o({scene:a,background:b=!1,map:e,...f}){let g=(0,d.useThree)(a=>a.scene);return c.useLayoutEffect(()=>{if(e)return n(b,a,g,e,f)}),null}function p({background:a=!1,scene:b,blur:e,backgroundBlurriness:f,backgroundIntensity:g,backgroundRotation:h,environmentIntensity:i,environmentRotation:j,...k}){let l=(0,m.useEnvironment)(k),o=(0,d.useThree)(a=>a.scene);return c.useLayoutEffect(()=>n(a,b,o,l,{backgroundBlurriness:null!=e?e:f,backgroundIntensity:g,backgroundRotation:h,environmentIntensity:i,environmentRotation:j})),c.useEffect(()=>()=>{l.dispose()},[l]),null}function q({children:a,near:b=.1,far:g=1e3,resolution:h=256,frames:j=1,map:k,background:l=!1,blur:m,backgroundBlurriness:q,backgroundIntensity:r,backgroundRotation:s,environmentIntensity:t,environmentRotation:u,scene:v,files:w,path:x,preset:y,extensions:z}){let A=(0,d.useThree)(a=>a.gl),B=(0,d.useThree)(a=>a.scene),C=c.useRef(null),[D]=c.useState(()=>new i.Scene),E=c.useMemo(()=>{let a=new i.WebGLCubeRenderTarget(h);return a.texture.type=i.HalfFloatType,a},[h]);c.useEffect(()=>()=>{E.dispose()},[E]),c.useLayoutEffect(()=>{if(1===j){let a=A.autoClear;A.autoClear=!0,C.current.update(A,D),A.autoClear=a}return n(l,v,B,E.texture,{backgroundBlurriness:null!=m?m:q,backgroundIntensity:r,backgroundRotation:s,environmentIntensity:t,environmentRotation:u})},[a,D,E.texture,v,B,l,j,A]);let F=1;return(0,e.useFrame)(()=>{if(j===1/0||F<j){let a=A.autoClear;A.autoClear=!0,C.current.update(A,D),A.autoClear=a,F++}}),c.createElement(c.Fragment,null,(0,f.o)(c.createElement(c.Fragment,null,a,c.createElement("cubeCamera",{ref:C,args:[b,g,E]}),w||y?c.createElement(p,{background:!0,files:w,preset:y,path:x,extensions:z}):k?c.createElement(o,{background:!0,map:k,extensions:z}):null),D))}function r(a){var d,e,f,g;let i=(0,m.useEnvironment)(a),j=a.map||i;c.useMemo(()=>(0,h.extend)({GroundProjectedEnvImpl:l}),[]),c.useEffect(()=>()=>{i.dispose()},[i]);let k=c.useMemo(()=>[j],[j]),n=null==(d=a.ground)?void 0:d.height,p=null==(e=a.ground)?void 0:e.radius,q=null!=(f=null==(g=a.ground)?void 0:g.scale)?f:1e3;return c.createElement(c.Fragment,null,c.createElement(o,(0,b.default)({},a,{map:j})),c.createElement("groundProjectedEnvImpl",{args:k,scale:q,height:n,radius:p}))}function s(a){return a.ground?c.createElement(r,a):a.map?c.createElement(o,a):a.children?c.createElement(q,a):c.createElement(p,a)}a.s(["Environment",()=>s],75636);let t={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},u={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},v=c.forwardRef(({scale:a=10,frames:f=1/0,opacity:g=1,width:h=1,height:j=1,blur:k=1,near:l=0,far:m=10,resolution:n=512,smooth:o=!0,color:p="#000000",depthWrite:q=!1,renderOrder:r,...s},v)=>{let w,x,y=c.useRef(null),z=(0,d.useThree)(a=>a.scene),A=(0,d.useThree)(a=>a.gl),B=c.useRef(null);h*=Array.isArray(a)?a[0]:a||1,j*=Array.isArray(a)?a[1]:a||1;let[C,D,E,F,G,H,I]=c.useMemo(()=>{let a=new i.WebGLRenderTarget(n,n),b=new i.WebGLRenderTarget(n,n);b.texture.generateMipmaps=a.texture.generateMipmaps=!1;let c=new i.PlaneGeometry(h,j).rotateX(Math.PI/2),d=new i.Mesh(c),e=new i.MeshDepthMaterial;e.depthTest=e.depthWrite=!1,e.onBeforeCompile=a=>{a.uniforms={...a.uniforms,ucolor:{value:new i.Color(p)}},a.fragmentShader=a.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),a.fragmentShader=a.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};let f=new i.ShaderMaterial(t),g=new i.ShaderMaterial(u);return g.depthTest=f.depthTest=!1,[a,c,e,d,f,g,b]},[n,h,j,a,p]),J=a=>{F.visible=!0,F.material=G,G.uniforms.tDiffuse.value=C.texture,G.uniforms.h.value=a/256,A.setRenderTarget(I),A.render(F,B.current),F.material=H,H.uniforms.tDiffuse.value=I.texture,H.uniforms.v.value=a/256,A.setRenderTarget(C),A.render(F,B.current),F.visible=!1},K=0;return(0,e.useFrame)(()=>{B.current&&(f===1/0||K<f)&&(K++,w=z.background,x=z.overrideMaterial,y.current.visible=!1,z.background=null,z.overrideMaterial=E,A.setRenderTarget(C),A.render(z,B.current),J(k),o&&J(.4*k),A.setRenderTarget(null),y.current.visible=!0,z.overrideMaterial=x,z.background=w)}),c.useImperativeHandle(v,()=>y.current,[]),c.createElement("group",(0,b.default)({"rotation-x":Math.PI/2},s,{ref:y}),c.createElement("mesh",{renderOrder:r,geometry:D,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},c.createElement("meshBasicMaterial",{transparent:!0,map:C.texture,opacity:g,depthWrite:q})),c.createElement("orthographicCamera",{ref:B,args:[-h/2,h/2,j/2,-j/2,l,m]}))});a.s(["ContactShadows",()=>v],49893);var w=Object.defineProperty;class x{constructor(){((a,b,c)=>{let d,e;e=void 0,(d="symbol"!=typeof b?b+"":b)in a?w(a,d,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[d]=e})(this,"_listeners")}addEventListener(a,b){void 0===this._listeners&&(this._listeners={});let c=this._listeners;void 0===c[a]&&(c[a]=[]),-1===c[a].indexOf(b)&&c[a].push(b)}hasEventListener(a,b){if(void 0===this._listeners)return!1;let c=this._listeners;return void 0!==c[a]&&-1!==c[a].indexOf(b)}removeEventListener(a,b){if(void 0===this._listeners)return;let c=this._listeners[a];if(void 0!==c){let a=c.indexOf(b);-1!==a&&c.splice(a,1)}}dispatchEvent(a){if(void 0===this._listeners)return;let b=this._listeners[a.type];if(void 0!==b){a.target=this;let c=b.slice(0);for(let b=0,d=c.length;b<d;b++)c[b].call(this,a);a.target=null}}}var y=Object.defineProperty,z=(a,b,c)=>{let d;return(d="symbol"!=typeof b?b+"":b)in a?y(a,d,{enumerable:!0,configurable:!0,writable:!0,value:c}):a[d]=c,c};let A=new i.Ray,B=new i.Plane,C=Math.cos(Math.PI/180*70),D=(a,b)=>(a%b+b)%b;class E extends x{constructor(a,b){super(),z(this,"object"),z(this,"domElement"),z(this,"enabled",!0),z(this,"target",new i.Vector3),z(this,"minDistance",0),z(this,"maxDistance",1/0),z(this,"minZoom",0),z(this,"maxZoom",1/0),z(this,"minPolarAngle",0),z(this,"maxPolarAngle",Math.PI),z(this,"minAzimuthAngle",-1/0),z(this,"maxAzimuthAngle",1/0),z(this,"enableDamping",!1),z(this,"dampingFactor",.05),z(this,"enableZoom",!0),z(this,"zoomSpeed",1),z(this,"enableRotate",!0),z(this,"rotateSpeed",1),z(this,"enablePan",!0),z(this,"panSpeed",1),z(this,"screenSpacePanning",!0),z(this,"keyPanSpeed",7),z(this,"zoomToCursor",!1),z(this,"autoRotate",!1),z(this,"autoRotateSpeed",2),z(this,"reverseOrbit",!1),z(this,"reverseHorizontalOrbit",!1),z(this,"reverseVerticalOrbit",!1),z(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),z(this,"mouseButtons",{LEFT:i.MOUSE.ROTATE,MIDDLE:i.MOUSE.DOLLY,RIGHT:i.MOUSE.PAN}),z(this,"touches",{ONE:i.TOUCH.ROTATE,TWO:i.TOUCH.DOLLY_PAN}),z(this,"target0"),z(this,"position0"),z(this,"zoom0"),z(this,"_domElementKeyEvents",null),z(this,"getPolarAngle"),z(this,"getAzimuthalAngle"),z(this,"setPolarAngle"),z(this,"setAzimuthalAngle"),z(this,"getDistance"),z(this,"getZoomScale"),z(this,"listenToKeyEvents"),z(this,"stopListenToKeyEvents"),z(this,"saveState"),z(this,"reset"),z(this,"update"),z(this,"connect"),z(this,"dispose"),z(this,"dollyIn"),z(this,"dollyOut"),z(this,"getScale"),z(this,"setScale"),this.object=a,this.domElement=b,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>k.phi,this.getAzimuthalAngle=()=>k.theta,this.setPolarAngle=a=>{let b=D(a,2*Math.PI),d=k.phi;d<0&&(d+=2*Math.PI),b<0&&(b+=2*Math.PI);let e=Math.abs(b-d);2*Math.PI-e<e&&(b<d?b+=2*Math.PI:d+=2*Math.PI),l.phi=b-d,c.update()},this.setAzimuthalAngle=a=>{let b=D(a,2*Math.PI),d=k.theta;d<0&&(d+=2*Math.PI),b<0&&(b+=2*Math.PI);let e=Math.abs(b-d);2*Math.PI-e<e&&(b<d?b+=2*Math.PI:d+=2*Math.PI),l.theta=b-d,c.update()},this.getDistance=()=>c.object.position.distanceTo(c.target),this.listenToKeyEvents=a=>{a.addEventListener("keydown",aa),this._domElementKeyEvents=a},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",aa),this._domElementKeyEvents=null},this.saveState=()=>{c.target0.copy(c.target),c.position0.copy(c.object.position),c.zoom0=c.object.zoom},this.reset=()=>{c.target.copy(c.target0),c.object.position.copy(c.position0),c.object.zoom=c.zoom0,c.object.updateProjectionMatrix(),c.dispatchEvent(d),c.update(),h=g.NONE},this.update=(()=>{let b=new i.Vector3,e=new i.Vector3(0,1,0),f=new i.Quaternion().setFromUnitVectors(a.up,e),o=f.clone().invert(),p=new i.Vector3,q=new i.Quaternion,r=2*Math.PI;return function(){let s=c.object.position;f.setFromUnitVectors(a.up,e),o.copy(f).invert(),b.copy(s).sub(c.target),b.applyQuaternion(f),k.setFromVector3(b),c.autoRotate&&h===g.NONE&&I(2*Math.PI/60/60*c.autoRotateSpeed),c.enableDamping?(k.theta+=l.theta*c.dampingFactor,k.phi+=l.phi*c.dampingFactor):(k.theta+=l.theta,k.phi+=l.phi);let t=c.minAzimuthAngle,u=c.maxAzimuthAngle;isFinite(t)&&isFinite(u)&&(t<-Math.PI?t+=r:t>Math.PI&&(t-=r),u<-Math.PI?u+=r:u>Math.PI&&(u-=r),t<=u?k.theta=Math.max(t,Math.min(u,k.theta)):k.theta=k.theta>(t+u)/2?Math.max(t,k.theta):Math.min(u,k.theta)),k.phi=Math.max(c.minPolarAngle,Math.min(c.maxPolarAngle,k.phi)),k.makeSafe(),!0===c.enableDamping?c.target.addScaledVector(n,c.dampingFactor):c.target.add(n),c.zoomToCursor&&E||c.object.isOrthographicCamera?k.radius=P(k.radius):k.radius=P(k.radius*m),b.setFromSpherical(k),b.applyQuaternion(o),s.copy(c.target).add(b),c.object.matrixAutoUpdate||c.object.updateMatrix(),c.object.lookAt(c.target),!0===c.enableDamping?(l.theta*=1-c.dampingFactor,l.phi*=1-c.dampingFactor,n.multiplyScalar(1-c.dampingFactor)):(l.set(0,0,0),n.set(0,0,0));let v=!1;if(c.zoomToCursor&&E){let d=null;if(c.object instanceof i.PerspectiveCamera&&c.object.isPerspectiveCamera){let a=b.length();d=P(a*m);let e=a-d;c.object.position.addScaledVector(x,e),c.object.updateMatrixWorld()}else if(c.object.isOrthographicCamera){let a=new i.Vector3(y.x,y.y,0);a.unproject(c.object),c.object.zoom=Math.max(c.minZoom,Math.min(c.maxZoom,c.object.zoom/m)),c.object.updateProjectionMatrix(),v=!0;let e=new i.Vector3(y.x,y.y,0);e.unproject(c.object),c.object.position.sub(e).add(a),c.object.updateMatrixWorld(),d=b.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),c.zoomToCursor=!1;null!==d&&(c.screenSpacePanning?c.target.set(0,0,-1).transformDirection(c.object.matrix).multiplyScalar(d).add(c.object.position):(A.origin.copy(c.object.position),A.direction.set(0,0,-1).transformDirection(c.object.matrix),Math.abs(c.object.up.dot(A.direction))<C?a.lookAt(c.target):(B.setFromNormalAndCoplanarPoint(c.object.up,c.target),A.intersectPlane(B,c.target))))}else c.object instanceof i.OrthographicCamera&&c.object.isOrthographicCamera&&(v=1!==m)&&(c.object.zoom=Math.max(c.minZoom,Math.min(c.maxZoom,c.object.zoom/m)),c.object.updateProjectionMatrix());return m=1,E=!1,!!(v||p.distanceToSquared(c.object.position)>j||8*(1-q.dot(c.object.quaternion))>j)&&(c.dispatchEvent(d),p.copy(c.object.position),q.copy(c.object.quaternion),v=!1,!0)}})(),this.connect=a=>{c.domElement=a,c.domElement.style.touchAction="none",c.domElement.addEventListener("contextmenu",ab),c.domElement.addEventListener("pointerdown",Y),c.domElement.addEventListener("pointercancel",$),c.domElement.addEventListener("wheel",_)},this.dispose=()=>{var a,b,d,e,f,g;c.domElement&&(c.domElement.style.touchAction="auto"),null==(a=c.domElement)||a.removeEventListener("contextmenu",ab),null==(b=c.domElement)||b.removeEventListener("pointerdown",Y),null==(d=c.domElement)||d.removeEventListener("pointercancel",$),null==(e=c.domElement)||e.removeEventListener("wheel",_),null==(f=c.domElement)||f.ownerDocument.removeEventListener("pointermove",Z),null==(g=c.domElement)||g.ownerDocument.removeEventListener("pointerup",$),null!==c._domElementKeyEvents&&c._domElementKeyEvents.removeEventListener("keydown",aa)};const c=this,d={type:"change"},e={type:"start"},f={type:"end"},g={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let h=g.NONE;const j=1e-6,k=new i.Spherical,l=new i.Spherical;let m=1;const n=new i.Vector3,o=new i.Vector2,p=new i.Vector2,q=new i.Vector2,r=new i.Vector2,s=new i.Vector2,t=new i.Vector2,u=new i.Vector2,v=new i.Vector2,w=new i.Vector2,x=new i.Vector3,y=new i.Vector2;let E=!1;const F=[],G={};function H(){return Math.pow(.95,c.zoomSpeed)}function I(a){c.reverseOrbit||c.reverseHorizontalOrbit?l.theta+=a:l.theta-=a}function J(a){c.reverseOrbit||c.reverseVerticalOrbit?l.phi+=a:l.phi-=a}const K=(()=>{let a=new i.Vector3;return function(b,c){a.setFromMatrixColumn(c,0),a.multiplyScalar(-b),n.add(a)}})(),L=(()=>{let a=new i.Vector3;return function(b,d){!0===c.screenSpacePanning?a.setFromMatrixColumn(d,1):(a.setFromMatrixColumn(d,0),a.crossVectors(c.object.up,a)),a.multiplyScalar(b),n.add(a)}})(),M=(()=>{let a=new i.Vector3;return function(b,d){let e=c.domElement;if(e&&c.object instanceof i.PerspectiveCamera&&c.object.isPerspectiveCamera){let f=c.object.position;a.copy(f).sub(c.target);let g=a.length();K(2*b*(g*=Math.tan(c.object.fov/2*Math.PI/180))/e.clientHeight,c.object.matrix),L(2*d*g/e.clientHeight,c.object.matrix)}else e&&c.object instanceof i.OrthographicCamera&&c.object.isOrthographicCamera?(K(b*(c.object.right-c.object.left)/c.object.zoom/e.clientWidth,c.object.matrix),L(d*(c.object.top-c.object.bottom)/c.object.zoom/e.clientHeight,c.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),c.enablePan=!1)}})();function N(a){c.object instanceof i.PerspectiveCamera&&c.object.isPerspectiveCamera||c.object instanceof i.OrthographicCamera&&c.object.isOrthographicCamera?m=a:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),c.enableZoom=!1)}function O(a){if(!c.zoomToCursor||!c.domElement)return;E=!0;let b=c.domElement.getBoundingClientRect(),d=a.clientX-b.left,e=a.clientY-b.top,f=b.width,g=b.height;y.x=d/f*2-1,y.y=-(e/g*2)+1,x.set(y.x,y.y,1).unproject(c.object).sub(c.object.position).normalize()}function P(a){return Math.max(c.minDistance,Math.min(c.maxDistance,a))}function Q(a){o.set(a.clientX,a.clientY)}function R(a){r.set(a.clientX,a.clientY)}function S(){if(1==F.length)o.set(F[0].pageX,F[0].pageY);else{let a=.5*(F[0].pageX+F[1].pageX),b=.5*(F[0].pageY+F[1].pageY);o.set(a,b)}}function T(){if(1==F.length)r.set(F[0].pageX,F[0].pageY);else{let a=.5*(F[0].pageX+F[1].pageX),b=.5*(F[0].pageY+F[1].pageY);r.set(a,b)}}function U(){let a=F[0].pageX-F[1].pageX,b=F[0].pageY-F[1].pageY,c=Math.sqrt(a*a+b*b);u.set(0,c)}function V(a){if(1==F.length)p.set(a.pageX,a.pageY);else{let b=ad(a),c=.5*(a.pageX+b.x),d=.5*(a.pageY+b.y);p.set(c,d)}q.subVectors(p,o).multiplyScalar(c.rotateSpeed);let b=c.domElement;b&&(I(2*Math.PI*q.x/b.clientHeight),J(2*Math.PI*q.y/b.clientHeight)),o.copy(p)}function W(a){if(1==F.length)s.set(a.pageX,a.pageY);else{let b=ad(a),c=.5*(a.pageX+b.x),d=.5*(a.pageY+b.y);s.set(c,d)}t.subVectors(s,r).multiplyScalar(c.panSpeed),M(t.x,t.y),r.copy(s)}function X(a){var b;let d=ad(a),e=a.pageX-d.x,f=a.pageY-d.y,g=Math.sqrt(e*e+f*f);v.set(0,g),w.set(0,Math.pow(v.y/u.y,c.zoomSpeed)),b=w.y,N(m/b),u.copy(v)}function Y(a){var b,d,f;!1!==c.enabled&&(0===F.length&&(null==(b=c.domElement)||b.ownerDocument.addEventListener("pointermove",Z),null==(d=c.domElement)||d.ownerDocument.addEventListener("pointerup",$)),f=a,F.push(f),"touch"===a.pointerType?function(a){switch(ac(a),F.length){case 1:switch(c.touches.ONE){case i.TOUCH.ROTATE:if(!1===c.enableRotate)return;S(),h=g.TOUCH_ROTATE;break;case i.TOUCH.PAN:if(!1===c.enablePan)return;T(),h=g.TOUCH_PAN;break;default:h=g.NONE}break;case 2:switch(c.touches.TWO){case i.TOUCH.DOLLY_PAN:if(!1===c.enableZoom&&!1===c.enablePan)return;c.enableZoom&&U(),c.enablePan&&T(),h=g.TOUCH_DOLLY_PAN;break;case i.TOUCH.DOLLY_ROTATE:if(!1===c.enableZoom&&!1===c.enableRotate)return;c.enableZoom&&U(),c.enableRotate&&S(),h=g.TOUCH_DOLLY_ROTATE;break;default:h=g.NONE}break;default:h=g.NONE}h!==g.NONE&&c.dispatchEvent(e)}(a):function(a){let b;switch(a.button){case 0:b=c.mouseButtons.LEFT;break;case 1:b=c.mouseButtons.MIDDLE;break;case 2:b=c.mouseButtons.RIGHT;break;default:b=-1}switch(b){case i.MOUSE.DOLLY:if(!1===c.enableZoom)return;O(a),u.set(a.clientX,a.clientY),h=g.DOLLY;break;case i.MOUSE.ROTATE:if(a.ctrlKey||a.metaKey||a.shiftKey){if(!1===c.enablePan)return;R(a),h=g.PAN}else{if(!1===c.enableRotate)return;Q(a),h=g.ROTATE}break;case i.MOUSE.PAN:if(a.ctrlKey||a.metaKey||a.shiftKey){if(!1===c.enableRotate)return;Q(a),h=g.ROTATE}else{if(!1===c.enablePan)return;R(a),h=g.PAN}break;default:h=g.NONE}h!==g.NONE&&c.dispatchEvent(e)}(a))}function Z(a){!1!==c.enabled&&("touch"===a.pointerType?function(a){switch(ac(a),h){case g.TOUCH_ROTATE:if(!1===c.enableRotate)return;V(a),c.update();break;case g.TOUCH_PAN:if(!1===c.enablePan)return;W(a),c.update();break;case g.TOUCH_DOLLY_PAN:if(!1===c.enableZoom&&!1===c.enablePan)return;c.enableZoom&&X(a),c.enablePan&&W(a),c.update();break;case g.TOUCH_DOLLY_ROTATE:if(!1===c.enableZoom&&!1===c.enableRotate)return;c.enableZoom&&X(a),c.enableRotate&&V(a),c.update();break;default:h=g.NONE}}(a):function(a){if(!1!==c.enabled)switch(h){case g.ROTATE:let b;if(!1===c.enableRotate)return;p.set(a.clientX,a.clientY),q.subVectors(p,o).multiplyScalar(c.rotateSpeed),(b=c.domElement)&&(I(2*Math.PI*q.x/b.clientHeight),J(2*Math.PI*q.y/b.clientHeight)),o.copy(p),c.update();break;case g.DOLLY:var d,e;if(!1===c.enableZoom)return;(v.set(a.clientX,a.clientY),w.subVectors(v,u),w.y>0)?(d=H(),N(m/d)):w.y<0&&(e=H(),N(m*e)),u.copy(v),c.update();break;case g.PAN:if(!1===c.enablePan)return;s.set(a.clientX,a.clientY),t.subVectors(s,r).multiplyScalar(c.panSpeed),M(t.x,t.y),r.copy(s),c.update()}}(a))}function $(a){var b,d,e;(function(a){delete G[a.pointerId];for(let b=0;b<F.length;b++)if(F[b].pointerId==a.pointerId)return void F.splice(b,1)})(a),0===F.length&&(null==(b=c.domElement)||b.releasePointerCapture(a.pointerId),null==(d=c.domElement)||d.ownerDocument.removeEventListener("pointermove",Z),null==(e=c.domElement)||e.ownerDocument.removeEventListener("pointerup",$)),c.dispatchEvent(f),h=g.NONE}function _(a){if(!1!==c.enabled&&!1!==c.enableZoom&&(h===g.NONE||h===g.ROTATE)){var b,d;a.preventDefault(),c.dispatchEvent(e),(O(a),a.deltaY<0)?(b=H(),N(m*b)):a.deltaY>0&&(d=H(),N(m/d)),c.update(),c.dispatchEvent(f)}}function aa(a){if(!1!==c.enabled&&!1!==c.enablePan){let b=!1;switch(a.code){case c.keys.UP:M(0,c.keyPanSpeed),b=!0;break;case c.keys.BOTTOM:M(0,-c.keyPanSpeed),b=!0;break;case c.keys.LEFT:M(c.keyPanSpeed,0),b=!0;break;case c.keys.RIGHT:M(-c.keyPanSpeed,0),b=!0}b&&(a.preventDefault(),c.update())}}function ab(a){!1!==c.enabled&&a.preventDefault()}function ac(a){let b=G[a.pointerId];void 0===b&&(b=new i.Vector2,G[a.pointerId]=b),b.set(a.pageX,a.pageY)}function ad(a){return G[(a.pointerId===F[0].pointerId?F[1]:F[0]).pointerId]}this.dollyIn=(a=H())=>{N(m*a),c.update()},this.dollyOut=(a=H())=>{N(m/a),c.update()},this.getScale=()=>m,this.setScale=a=>{N(a),c.update()},this.getZoomScale=()=>H(),void 0!==b&&this.connect(b),this.update()}}let F=c.forwardRef(({makeDefault:a,camera:f,regress:g,domElement:h,enableDamping:i=!0,keyEvents:j=!1,onChange:k,onStart:l,onEnd:m,...n},o)=>{let p=(0,d.useThree)(a=>a.invalidate),q=(0,d.useThree)(a=>a.camera),r=(0,d.useThree)(a=>a.gl),s=(0,d.useThree)(a=>a.events),t=(0,d.useThree)(a=>a.setEvents),u=(0,d.useThree)(a=>a.set),v=(0,d.useThree)(a=>a.get),w=(0,d.useThree)(a=>a.performance),x=f||q,y=h||s.connected||r.domElement,z=c.useMemo(()=>new E(x),[x]);return(0,e.useFrame)(()=>{z.enabled&&z.update()},-1),c.useEffect(()=>(j&&z.connect(!0===j?y:j),z.connect(y),()=>void z.dispose()),[j,y,g,z,p]),c.useEffect(()=>{let a=a=>{p(),g&&w.regress(),k&&k(a)},b=a=>{l&&l(a)},c=a=>{m&&m(a)};return z.addEventListener("change",a),z.addEventListener("start",b),z.addEventListener("end",c),()=>{z.removeEventListener("start",b),z.removeEventListener("end",c),z.removeEventListener("change",a)}},[k,l,m,z,p,t]),c.useEffect(()=>{if(a){let a=v().controls;return u({controls:z}),()=>u({controls:a})}},[a,z]),c.createElement("primitive",(0,b.default)({ref:o,object:z,enableDamping:i},n))});a.s(["OrbitControls",()=>F],295)}];

//# sourceMappingURL=6e8f0_%40react-three_drei_core_Environment_0e1e6d0b.js.map