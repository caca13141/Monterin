(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,16748,e=>{"use strict";let t,r,n,i,o,a,s,l,c,u,d,f,p,h,y,x,m,v,g,b,w,B,M,T,A,I,P,D,_,F,S,U,V,C,N,z,E,R;var O=e.i(97245),H=e.i(82523),G=e.i(62),k=e.i(39781),L=e.i(31361),q=e.i(1582),Y=q;function X(e){switch(e){case 1:return Y.RedIntegerFormat;case 2:return Y.RGIntegerFormat;case 3:case 4:return Y.RGBAIntegerFormat}}class W extends Y.DataTexture{constructor(){super(),this.minFilter=Y.NearestFilter,this.magFilter=Y.NearestFilter,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(e){let t,r,n,i,o=this.overrideItemSize,a=e.itemSize,s=e.count;if(null!==o){if(a*s%o!=0)throw Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");e.itemSize=o,e.count=s*a/o}let l=e.itemSize,c=e.count,u=e.normalized,d=e.array.constructor,f=d.BYTES_PER_ELEMENT,p=this._forcedType,h=l;if(null===p)switch(d){case Float32Array:p=Y.FloatType;break;case Uint8Array:case Uint16Array:case Uint32Array:p=Y.UnsignedIntType;break;case Int8Array:case Int16Array:case Int32Array:p=Y.IntType}let y=function(e){switch(e){case 1:return"R";case 2:return"RG";case 3:case 4:return"RGBA"}throw Error()}(l);switch(p){case Y.FloatType:n=1,r=function(e){switch(e){case 1:return Y.RedFormat;case 2:return Y.RGFormat;case 3:case 4:return Y.RGBAFormat}}(l),u&&1===f?(i=d,y+="8",d===Uint8Array?t=Y.UnsignedByteType:(t=Y.ByteType,y+="_SNORM")):(i=Float32Array,y+="32F",t=Y.FloatType);break;case Y.IntType:y+=8*f+"I",n=u?Math.pow(2,8*d.BYTES_PER_ELEMENT-1):1,r=X(l),1===f?(i=Int8Array,t=Y.ByteType):2===f?(i=Int16Array,t=Y.ShortType):(i=Int32Array,t=Y.IntType);break;case Y.UnsignedIntType:y+=8*f+"UI",n=u?Math.pow(2,8*d.BYTES_PER_ELEMENT-1):1,r=X(l),1===f?(i=Uint8Array,t=Y.UnsignedByteType):2===f?(i=Uint16Array,t=Y.UnsignedShortType):(i=Uint32Array,t=Y.UnsignedIntType)}3===h&&(r===Y.RGBAFormat||r===Y.RGBAIntegerFormat)&&(h=4);let x=Math.ceil(Math.sqrt(c))||1,m=new i(h*x*x),v=e.normalized;e.normalized=!1;for(let t=0;t<c;t++){let r=h*t;m[r]=e.getX(t)/n,l>=2&&(m[r+1]=e.getY(t)/n),l>=3&&(m[r+2]=e.getZ(t)/n,4===h&&(m[r+3]=1)),l>=4&&(m[r+3]=e.getW(t)/n)}e.normalized=v,this.internalFormat=y,this.format=r,this.type=t,this.image.width=x,this.image.height=x,this.image.data=m,this.needsUpdate=!0,this.dispose(),e.itemSize=a,e.count=s}}class j extends W{constructor(){super(),this._forcedType=Y.UnsignedIntType}}class $ extends W{constructor(){super(),this._forcedType=Y.FloatType}}let K=Symbol("SKIP_GENERATION");function Z(e,t){return 65535===t[e+15]}function J(e,t){return t[e+14]}function Q(e){return e.index?e.index.count:e.attributes.position.count}function ee(e){return Q(e)/3}function et(e,t=ArrayBuffer){return e>65535?new Uint32Array(new t(4*e)):new Uint16Array(new t(2*e))}function er(e,t){let r=ee(e),n=t||e.drawRange,i=n.start/3,o=(n.start+n.count)/3,a=Math.max(0,i),s=Math.min(r,o)-a;return[{offset:Math.floor(a),count:Math.floor(s)}]}function en(e,t){if(!e.groups||!e.groups.length)return er(e,t);let r=[],n=new Set,i=t||e.drawRange,o=i.start/3,a=(i.start+i.count)/3;for(let t of e.groups){let e=t.start/3,r=(t.start+t.count)/3;n.add(Math.max(o,e)),n.add(Math.min(a,r))}let s=Array.from(n.values()).sort((e,t)=>e-t);for(let e=0;e<s.length-1;e++){let t=s[e],n=s[e+1];r.push({offset:Math.floor(t),count:Math.floor(n-t)})}return r}class ei{constructor(){this.index=new j,this.position=new $,this.bvhBounds=new q.DataTexture,this.bvhContents=new q.DataTexture,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(e){let{geometry:t}=e;if(function(e,t,r){let n=e._roots;if(1!==n.length)throw Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let i=n[0],o=new Uint16Array(i),a=new Uint32Array(i),s=new Float32Array(i),l=i.byteLength/32,c=2*Math.ceil(Math.sqrt(l/2)),u=new Float32Array(4*c*c),d=Math.ceil(Math.sqrt(l)),f=new Uint32Array(2*d*d);for(let e=0;e<l;e++){let t=32*e/4,r=2*t;for(let r=0;r<3;r++)u[8*e+0+r]=s[t+0+r],u[8*e+4+r]=s[t+3+r];if(Z(r,o)){let n=J(r,o),i=a[t+6],s=0xffff0000|n;f[2*e+0]=s,f[2*e+1]=i}else{let r=4*a[t+6]/32,n=a[t+7];f[2*e+0]=n,f[2*e+1]=r}}t.image.data=u,t.image.width=c,t.image.height=c,t.format=q.RGBAFormat,t.type=q.FloatType,t.internalFormat="RGBA32F",t.minFilter=q.NearestFilter,t.magFilter=q.NearestFilter,t.generateMipmaps=!1,t.needsUpdate=!0,t.dispose(),r.image.data=f,r.image.width=d,r.image.height=d,r.format=q.RGIntegerFormat,r.type=q.UnsignedIntType,r.internalFormat="RG32UI",r.minFilter=q.NearestFilter,r.magFilter=q.NearestFilter,r.generateMipmaps=!1,r.needsUpdate=!0,r.dispose()}(e,this.bvhBounds,this.bvhContents),this.position.updateFrom(t.attributes.position),e.indirect){let r=e._indirectBuffer;if(null===this._cachedIndexAttr||this._cachedIndexAttr.count!==r.length)if(t.index)this._cachedIndexAttr=t.index.clone();else{let e=et(Q(t));this._cachedIndexAttr=new q.BufferAttribute(e,1,!1)}(function(e,t,r){let n=r.array,i=e.index?e.index.array:null;for(let e=0,r=t.length;e<r;e++){let r=3*e,o=3*t[e];for(let e=0;e<3;e++)n[r+e]=i?i[o+e]:o+e}})(t,r,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(t.index)}dispose(){let{index:e,position:t,bvhBounds:r,bvhContents:n}=this;e&&e.dispose(),t&&t.dispose(),r&&r.dispose(),n&&n.dispose()}}function eo(e,t,r,n,i){let o=1/0,a=1/0,s=1/0,l=-1/0,c=-1/0,u=-1/0,d=1/0,f=1/0,p=1/0,h=-1/0,y=-1/0,x=-1/0;for(let n=6*t,i=(t+r)*6;n<i;n+=6){let t=e[n+0],r=e[n+1],i=t-r,m=t+r;i<o&&(o=i),m>l&&(l=m),t<d&&(d=t),t>h&&(h=t);let v=e[n+2],g=e[n+3],b=v-g,w=v+g;b<a&&(a=b),w>c&&(c=w),v<f&&(f=v),v>y&&(y=v);let B=e[n+4],M=e[n+5],T=B-M,A=B+M;T<s&&(s=T),A>u&&(u=A),B<p&&(p=B),B>x&&(x=B)}n[0]=o,n[1]=a,n[2]=s,n[3]=l,n[4]=c,n[5]=u,i[0]=d,i[1]=f,i[2]=p,i[3]=h,i[4]=y,i[5]=x}function ea(e,t,r){return r.min.x=t[e],r.min.y=t[e+1],r.min.z=t[e+2],r.max.x=t[e+3],r.max.y=t[e+4],r.max.z=t[e+5],r}function es(e){let t=-1,r=-1/0;for(let n=0;n<3;n++){let i=e[n+3]-e[n];i>r&&(r=i,t=n)}return t}function el(e,t,r){let n,i;for(let o=0;o<3;o++){let a=o+3;n=e[o],i=t[o],r[o]=n<i?n:i,n=e[a],i=t[a],r[a]=n>i?n:i}}function ec(e,t,r){for(let n=0;n<3;n++){let i=t[e+2*n],o=t[e+2*n+1],a=i-o,s=i+o;a<r[n]&&(r[n]=a),s>r[n+3]&&(r[n+3]=s)}}function eu(e){let t=e[3]-e[0],r=e[4]-e[1],n=e[5]-e[2];return 2*(t*r+r*n+n*t)}let ed=(e,t)=>e.candidate-t.candidate,ef=Array(32).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),ep=new Float32Array(6);class eh{constructor(){this.boundingData=new Float32Array(6)}}function ey(e,t,r,n,i,o){let a=n,s=n+i-1,l=o.pos,c=2*o.axis;for(;;){for(;a<=s&&r[6*a+c]<l;)a++;for(;a<=s&&r[6*s+c]>=l;)s--;if(!(a<s))return a;for(let e=0;e<3;e++){let r=t[3*a+e];t[3*a+e]=t[3*s+e],t[3*s+e]=r}for(let e=0;e<6;e++){let t=r[6*a+e];r[6*a+e]=r[6*s+e],r[6*s+e]=t}a++,s--}}function ex(e,t,r,n,i,o){let a=n,s=n+i-1,l=o.pos,c=2*o.axis;for(;;){for(;a<=s&&r[6*a+c]<l;)a++;for(;a<=s&&r[6*s+c]>=l;)s--;if(!(a<s))return a;{let t=e[a];e[a]=e[s],e[s]=t;for(let e=0;e<6;e++){let t=r[6*a+e];r[6*a+e]=r[6*s+e],r[6*s+e]=t}a++,s--}}}class em{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(e,t){let r=1/0,n=-1/0;for(let i=0,o=e.length;i<o;i++){let o=e[i][t];r=o<r?o:r,n=o>n?o:n}this.min=r,this.max=n}setFromPoints(e,t){let r=1/0,n=-1/0;for(let i=0,o=t.length;i<o;i++){let o=t[i],a=e.dot(o);r=a<r?a:r,n=a>n?a:n}this.min=r,this.max=n}isSeparated(e){return this.min>e.max||e.min>this.max}}em.prototype.setFromBox=(s=new q.Vector3,function(e,t){let r=t.min,n=t.max,i=1/0,o=-1/0;for(let t=0;t<=1;t++)for(let a=0;a<=1;a++)for(let l=0;l<=1;l++){s.x=r.x*t+n.x*(1-t),s.y=r.y*a+n.y*(1-a),s.z=r.z*l+n.z*(1-l);let c=e.dot(s);i=Math.min(c,i),o=Math.max(c,o)}this.min=i,this.max=o}),new em;var ev=q;let eg=(l=new q.Vector3,c=new q.Vector3,u=new q.Vector3,function(e,t,r){let n,i,o=e.start,a=t.start;u.subVectors(o,a),l.subVectors(e.end,e.start),c.subVectors(t.end,t.start);let s=u.dot(c),d=c.dot(l),f=c.dot(c),p=u.dot(l),h=l.dot(l)*f-d*d;n=0!==h?(s*d-p*f)/h:0,i=(s+n*d)/f,r.x=n,r.y=i}),eb=(d=new q.Vector2,f=new q.Vector3,p=new q.Vector3,function(e,t,r,n){eg(e,t,d);let i=d.x,o=d.y;if(i>=0&&i<=1&&o>=0&&o<=1){e.at(i,r),t.at(o,n);return}if(i>=0&&i<=1){o<0?t.at(0,n):t.at(1,n),e.closestPointToPoint(n,!0,r);return}if(o>=0&&o<=1){i<0?e.at(0,r):e.at(1,r),t.closestPointToPoint(r,!0,n);return}{let a,s;if(a=i<0?e.start:e.end,s=o<0?t.start:t.end,e.closestPointToPoint(s,!0,f),t.closestPointToPoint(a,!0,p),f.distanceToSquared(s)<=p.distanceToSquared(a)){r.copy(f),n.copy(s);return}r.copy(a),n.copy(p);return}}),ew=(h=new q.Vector3,y=new q.Vector3,x=new q.Plane,m=new q.Line3,function(e,t){let{radius:r,center:n}=e,{a:i,b:o,c:a}=t;if(m.start=i,m.end=o,m.closestPointToPoint(n,!0,h).distanceTo(n)<=r||(m.start=i,m.end=a,m.closestPointToPoint(n,!0,h).distanceTo(n)<=r)||(m.start=o,m.end=a,m.closestPointToPoint(n,!0,h).distanceTo(n)<=r))return!0;let s=t.getPlane(x);if(Math.abs(s.distanceToPoint(n))<=r){let e=s.projectPoint(n,y);if(t.containsPoint(e))return!0}return!1});function eB(e){return 1e-15>Math.abs(e)}class eM extends ev.Triangle{constructor(...e){super(...e),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new ev.Vector3),this.satBounds=[,,,,].fill().map(()=>new em),this.points=[this.a,this.b,this.c],this.sphere=new ev.Sphere,this.plane=new ev.Plane,this.needsUpdate=!0}intersectsSphere(e){return ew(e,this)}update(){let e=this.a,t=this.b,r=this.c,n=this.points,i=this.satAxes,o=this.satBounds,a=i[0],s=o[0];this.getNormal(a),s.setFromPoints(a,n);let l=i[1],c=o[1];l.subVectors(e,t),c.setFromPoints(l,n);let u=i[2],d=o[2];u.subVectors(t,r),d.setFromPoints(u,n);let f=i[3],p=o[3];f.subVectors(r,e),p.setFromPoints(f,n),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(a,e),this.needsUpdate=!1}}eM.prototype.closestPointToSegment=(v=new ev.Vector3,g=new ev.Vector3,b=new ev.Line3,function(e,t=null,r=null){let n,{start:i,end:o}=e,a=this.points,s=1/0;for(let i=0;i<3;i++){let o=(i+1)%3;b.start.copy(a[i]),b.end.copy(a[o]),eb(b,e,v,g),(n=v.distanceToSquared(g))<s&&(s=n,t&&t.copy(v),r&&r.copy(g))}return this.closestPointToPoint(i,v),(n=i.distanceToSquared(v))<s&&(s=n,t&&t.copy(v),r&&r.copy(i)),this.closestPointToPoint(o,v),(n=o.distanceToSquared(v))<s&&(s=n,t&&t.copy(v),r&&r.copy(o)),Math.sqrt(s)}),eM.prototype.intersectsTriangle=function(){let e=new eM,t=[,,,],r=[,,,],n=new em,i=new em,o=new ev.Vector3,a=new ev.Vector3,s=new ev.Vector3,l=new ev.Vector3,c=new ev.Vector3,u=new ev.Line3,d=new ev.Line3,f=new ev.Line3,p=new ev.Vector3;function h(e,t,r){let n=e.points,i=0,o=-1;for(let e=0;e<3;e++){let{start:s,end:l}=u;s.copy(n[e]),l.copy(n[(e+1)%3]),u.delta(a);let c=eB(t.distanceToPoint(s));if(eB(t.normal.dot(a))&&c){r.copy(u),i=2;break}let d=t.intersectLine(u,p);if(!d&&c&&p.copy(s),(d||c)&&!eB(p.distanceTo(l))){if(i<=1)(1===i?r.start:r.end).copy(p),c&&(o=i);else if(i>=2){(1===o?r.start:r.end).copy(p),i=2;break}if(2==++i&&-1===o)break}}return i}return function(a,u=null,p=!1){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(e.copy(a),e.update(),a=e);let y=this.plane,x=a.plane;if(Math.abs(y.normal.dot(x.normal))>1-1e-10){let e=this.satBounds,s=this.satAxes;r[0]=a.a,r[1]=a.b,r[2]=a.c;for(let t=0;t<4;t++){let i=e[t],o=s[t];if(n.setFromPoints(o,r),i.isSeparated(n))return!1}let l=a.satBounds,c=a.satAxes;t[0]=this.a,t[1]=this.b,t[2]=this.c;for(let e=0;e<4;e++){let r=l[e],i=c[e];if(n.setFromPoints(i,t),r.isSeparated(n))return!1}for(let e=0;e<4;e++){let a=s[e];for(let e=0;e<4;e++){let s=c[e];if(o.crossVectors(a,s),n.setFromPoints(o,t),i.setFromPoints(o,r),n.isSeparated(i))return!1}}return u&&(p||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),u.start.set(0,0,0),u.end.set(0,0,0)),!0}{let e=h(this,x,d);if(1===e&&a.containsPoint(d.end))return u&&(u.start.copy(d.end),u.end.copy(d.end)),!0;if(2!==e)return!1;let t=h(a,y,f);if(1===t&&this.containsPoint(f.end))return u&&(u.start.copy(f.end),u.end.copy(f.end)),!0;if(2!==t)return!1;if(d.delta(s),f.delta(l),0>s.dot(l)){let e=f.start;f.start=f.end,f.end=e}let r=d.start.dot(s),n=d.end.dot(s),i=f.start.dot(s),o=f.end.dot(s);return(r===o||i===n||n<i!=r<o)&&(u&&(c.subVectors(d.start,f.start),c.dot(s)>0?u.start.copy(d.start):u.start.copy(f.start),c.subVectors(d.end,f.end),0>c.dot(s)?u.end.copy(d.end):u.end.copy(f.end)),!0)}}}(),eM.prototype.distanceToPoint=(w=new ev.Vector3,function(e){return this.closestPointToPoint(e,w),e.distanceTo(w)}),eM.prototype.distanceToTriangle=(B=new ev.Vector3,M=new ev.Vector3,T=["a","b","c"],A=new ev.Line3,I=new ev.Line3,function(e,t=null,r=null){let n=t||r?A:null;if(this.intersectsTriangle(e,n))return(t||r)&&(t&&n.getCenter(t),r&&n.getCenter(r)),0;let i=1/0;for(let n=0;n<3;n++){let o,a=T[n],s=e[a];this.closestPointToPoint(s,B),(o=s.distanceToSquared(B))<i&&(i=o,t&&t.copy(B),r&&r.copy(s));let l=this[a];e.closestPointToPoint(l,B),(o=l.distanceToSquared(B))<i&&(i=o,t&&t.copy(l),r&&r.copy(B))}for(let n=0;n<3;n++){let o=T[n],a=T[(n+1)%3];A.set(this[o],this[a]);for(let n=0;n<3;n++){let o=T[n],a=T[(n+1)%3];I.set(e[o],e[a]),eb(A,I,B,M);let s=B.distanceToSquared(M);s<i&&(i=s,t&&t.copy(B),r&&r.copy(M))}}return Math.sqrt(i)});class eT{constructor(e,t,r){this.isOrientedBox=!0,this.min=new q.Vector3,this.max=new q.Vector3,this.matrix=new q.Matrix4,this.invMatrix=new q.Matrix4,this.points=Array(8).fill().map(()=>new q.Vector3),this.satAxes=[,,,].fill().map(()=>new q.Vector3),this.satBounds=[,,,].fill().map(()=>new em),this.alignedSatBounds=[,,,].fill().map(()=>new em),this.needsUpdate=!1,e&&this.min.copy(e),t&&this.max.copy(t),r&&this.matrix.copy(r)}set(e,t,r){this.min.copy(e),this.max.copy(t),this.matrix.copy(r),this.needsUpdate=!0}copy(e){this.min.copy(e.min),this.max.copy(e.max),this.matrix.copy(e.matrix),this.needsUpdate=!0}}eT.prototype.update=function(){let e=this.matrix,t=this.min,r=this.max,n=this.points;for(let i=0;i<=1;i++)for(let o=0;o<=1;o++)for(let a=0;a<=1;a++){let s=n[i|2*o|4*a];s.x=i?r.x:t.x,s.y=o?r.y:t.y,s.z=a?r.z:t.z,s.applyMatrix4(e)}let i=this.satBounds,o=this.satAxes,a=n[0];for(let e=0;e<3;e++){let t=o[e],r=i[e],s=n[1<<e];t.subVectors(a,s),r.setFromPoints(t,n)}let s=this.alignedSatBounds;s[0].setFromPointsField(n,"x"),s[1].setFromPointsField(n,"y"),s[2].setFromPointsField(n,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1},eT.prototype.intersectsBox=(P=new em,function(e){this.needsUpdate&&this.update();let t=e.min,r=e.max,n=this.satBounds,i=this.satAxes,o=this.alignedSatBounds;if(P.min=t.x,P.max=r.x,o[0].isSeparated(P)||(P.min=t.y,P.max=r.y,o[1].isSeparated(P))||(P.min=t.z,P.max=r.z,o[2].isSeparated(P)))return!1;for(let t=0;t<3;t++){let r=i[t],o=n[t];if(P.setFromBox(r,e),o.isSeparated(P))return!1}return!0}),eT.prototype.intersectsTriangle=(D=new eM,_=[,,,],F=new em,S=new em,U=new q.Vector3,function(e){this.needsUpdate&&this.update(),e.isExtendedTriangle?e.needsUpdate&&e.update():(D.copy(e),D.update(),e=D);let t=this.satBounds,r=this.satAxes;_[0]=e.a,_[1]=e.b,_[2]=e.c;for(let e=0;e<3;e++){let n=t[e],i=r[e];if(F.setFromPoints(i,_),n.isSeparated(F))return!1}let n=e.satBounds,i=e.satAxes,o=this.points;for(let e=0;e<3;e++){let t=n[e],r=i[e];if(F.setFromPoints(r,o),t.isSeparated(F))return!1}for(let e=0;e<3;e++){let t=r[e];for(let e=0;e<4;e++){let r=i[e];if(U.crossVectors(t,r),F.setFromPoints(U,_),S.setFromPoints(U,o),F.isSeparated(S))return!1}}return!0}),eT.prototype.closestPointToPoint=function(e,t){return this.needsUpdate&&this.update(),t.copy(e).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),t},eT.prototype.distanceToPoint=(V=new q.Vector3,function(e){return this.closestPointToPoint(e,V),e.distanceTo(V)}),eT.prototype.distanceToBox=(C=["x","y","z"],N=Array(12).fill().map(()=>new q.Line3),z=Array(12).fill().map(()=>new q.Line3),E=new q.Vector3,R=new q.Vector3,function(e,t=0,r=null,n=null){if(this.needsUpdate&&this.update(),this.intersectsBox(e))return(r||n)&&(e.getCenter(R),this.closestPointToPoint(R,E),e.closestPointToPoint(E,R),r&&r.copy(E),n&&n.copy(R)),0;let i=t*t,o=e.min,a=e.max,s=this.points,l=1/0;for(let e=0;e<8;e++){let t=s[e];R.copy(t).clamp(o,a);let c=t.distanceToSquared(R);if(c<l&&(l=c,r&&r.copy(t),n&&n.copy(R),c<i))return Math.sqrt(c)}let c=0;for(let e=0;e<3;e++)for(let t=0;t<=1;t++)for(let r=0;r<=1;r++){let n=(e+1)%3,i=(e+2)%3,l=t<<n|r<<i,u=1<<e|t<<n|r<<i,d=s[l],f=s[u];N[c].set(d,f);let p=C[e],h=C[n],y=C[i],x=z[c],m=x.start,v=x.end;m[p]=o[p],m[h]=t?o[h]:a[h],m[y]=r?o[y]:a[h],v[p]=a[p],v[h]=t?o[h]:a[h],v[y]=r?o[y]:a[h],c++}for(let e=0;e<=1;e++)for(let t=0;t<=1;t++)for(let s=0;s<=1;s++){R.x=e?a.x:o.x,R.y=t?a.y:o.y,R.z=s?a.z:o.z,this.closestPointToPoint(R,E);let c=R.distanceToSquared(E);if(c<l&&(l=c,r&&r.copy(E),n&&n.copy(R),c<i))return Math.sqrt(c)}for(let e=0;e<12;e++){let t=N[e];for(let e=0;e<12;e++){eb(t,z[e],E,R);let o=E.distanceToSquared(R);if(o<l&&(l=o,r&&r.copy(E),n&&n.copy(R),o<i))return Math.sqrt(o)}}return Math.sqrt(l)});class eA{constructor(e){this._getNewPrimitive=e,this._primitives=[]}getPrimitive(){let e=this._primitives;return 0===e.length?this._getNewPrimitive():e.pop()}releasePrimitive(e){this._primitives.push(e)}}let eI=new class extends eA{constructor(){super(()=>new eM)}},eP=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const e=[];let t=null;this.setBuffer=r=>{t&&e.push(t),t=r,this.float32Array=new Float32Array(r),this.uint16Array=new Uint16Array(r),this.uint32Array=new Uint32Array(r)},this.clearBuffer=()=>{t=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,0!==e.length&&this.setBuffer(e.pop())}}},eD=[],e_=new eA(()=>new q.Box3),eF=new q.Vector3,eS=new q.Vector3,eU=parseInt(q.REVISION)>=169,eV=new q.Vector3,eC=new q.Vector3,eN=new q.Vector3,ez=new q.Vector2,eE=new q.Vector2,eR=new q.Vector2,eO=new q.Vector3,eH=new q.Vector3,eG=new q.Vector3,ek=new q.Vector3;function eL(e,t,r,n,i,o,a){let s=3*n,l=s+0,c=s+1,u=s+2,d=e.index;e.index&&(l=d.getX(l),c=d.getX(c),u=d.getX(u));let{position:f,normal:p,uv:h,uv1:y}=e.attributes,x=function(e,t,r,n,i,o,a,s,l,c,u){eV.fromBufferAttribute(t,o),eC.fromBufferAttribute(t,a),eN.fromBufferAttribute(t,s);let d=function(e,t,r,n,i,o,a,s){if(null===(o===q.BackSide?e.intersectTriangle(n,r,t,!0,i):e.intersectTriangle(t,r,n,o!==q.DoubleSide,i)))return null;let l=e.origin.distanceTo(i);return l<a||l>s?null:{distance:l,point:i.clone()}}(e,eV,eC,eN,ek,l,c,u);if(d){let t=new q.Vector3;q.Triangle.getBarycoord(ek,eV,eC,eN,t),n&&(ez.fromBufferAttribute(n,o),eE.fromBufferAttribute(n,a),eR.fromBufferAttribute(n,s),d.uv=q.Triangle.getInterpolation(ek,eV,eC,eN,ez,eE,eR,new q.Vector2)),i&&(ez.fromBufferAttribute(i,o),eE.fromBufferAttribute(i,a),eR.fromBufferAttribute(i,s),d.uv1=q.Triangle.getInterpolation(ek,eV,eC,eN,ez,eE,eR,new q.Vector2)),r&&(eO.fromBufferAttribute(r,o),eH.fromBufferAttribute(r,a),eG.fromBufferAttribute(r,s),d.normal=q.Triangle.getInterpolation(ek,eV,eC,eN,eO,eH,eG,new q.Vector3),d.normal.dot(e.direction)>0&&d.normal.multiplyScalar(-1));let l={a:o,b:a,c:s,normal:new q.Vector3,materialIndex:0};q.Triangle.getNormal(eV,eC,eN,l.normal),d.face=l,d.faceIndex=o,eU&&(d.barycoord=t)}return d}(r,f,p,h,y,l,c,u,t,o,a);return x?(x.faceIndex=n,i&&i.push(x),x):null}function eq(e,t,r,n){let i=e.a,o=e.b,a=e.c,s=t,l=t+1,c=t+2;r&&(s=r.getX(s),l=r.getX(l),c=r.getX(c)),i.x=n.getX(s),i.y=n.getY(s),i.z=n.getZ(s),o.x=n.getX(l),o.y=n.getY(l),o.z=n.getZ(l),a.x=n.getX(c),a.y=n.getY(c),a.z=n.getZ(c)}function eY(e,t,r,n,i,o,a){let{geometry:s}=r,{index:l}=s,c=s.attributes.position;for(let r=e,s=t+e;r<s;r++){let e;if(eq(a,3*(e=r),l,c),a.needsUpdate=!0,n(a,e,i,o))return!0}return!1}function eX(e,t,r,n,i){let o,a,s,l,c,u,d=1/r.direction.x,f=1/r.direction.y,p=1/r.direction.z,h=r.origin.x,y=r.origin.y,x=r.origin.z,m=t[e],v=t[e+3],g=t[e+1],b=t[e+3+1],w=t[e+2],B=t[e+3+2];return d>=0?(o=(m-h)*d,a=(v-h)*d):(o=(v-h)*d,a=(m-h)*d),f>=0?(s=(g-y)*f,l=(b-y)*f):(s=(b-y)*f,l=(g-y)*f),!(o>l)&&!(s>a)&&((s>o||isNaN(o))&&(o=s),(l<a||isNaN(a))&&(a=l),p>=0?(c=(w-x)*p,u=(B-x)*p):(c=(B-x)*p,u=(w-x)*p),!(o>u)&&!(c>a)&&((c>o||o!=o)&&(o=c),(u<a||a!=a)&&(a=u),o<=i&&a>=n))}function eW(e,t,r,n,i,o,a){eP.setBuffer(e._roots[t]),function e(t,r,n,i,o,a,s){let{float32Array:l,uint16Array:c,uint32Array:u}=eP,d=2*t;if(Z(d,c))!function(e,t,r,n,i,o,a,s){let{geometry:l,_indirectBuffer:c}=e;for(let e=n,c=n+i;e<c;e++)eL(l,t,r,e,o,a,s)}(r,n,i,u[t+6],J(d,c),o,a,s);else{let c=t+8;eX(c,l,i,a,s)&&e(c,r,n,i,o,a,s);let d=u[t+6];eX(d,l,i,a,s)&&e(d,r,n,i,o,a,s)}}(0,e,r,n,i,o,a),eP.clearBuffer()}let ej=["x","y","z"];function e$(e,t,r,n,i,o){eP.setBuffer(e._roots[t]);let a=function e(t,r,n,i,o,a){let{float32Array:s,uint16Array:l,uint32Array:c}=eP,u=2*t;if(Z(u,l))return function(e,t,r,n,i,o,a){let{geometry:s,_indirectBuffer:l}=e,c=1/0,u=null;for(let e=n,l=n+i;e<l;e++){let n;(n=eL(s,t,r,e,null,o,a))&&n.distance<c&&(u=n,c=n.distance)}return u}(r,n,i,c[t+6],J(u,l),o,a);{let l,u,d=c[t+7],f=ej[d],p=i.direction[f]>=0;p?(l=t+8,u=c[t+6]):(l=c[t+6],u=t+8);let h=eX(l,s,i,o,a)?e(l,r,n,i,o,a):null;if(h){let e=h.point[f];if(p?e<=s[u+d]:e>=s[u+d+3])return h}let y=eX(u,s,i,o,a)?e(u,r,n,i,o,a):null;return h&&y?h.distance<=y.distance?h:y:h||y||null}}(0,e,r,n,i,o);return eP.clearBuffer(),a}let eK=new q.Box3,eZ=new eM,eJ=new eM,eQ=new q.Matrix4,e0=new eT,e1=new eT;function e3(e,t,r,n){eP.setBuffer(e._roots[t]);let i=function e(t,r,n,i,o=null){let{float32Array:a,uint16Array:s,uint32Array:l}=eP,c=2*t;if(null===o&&(n.boundingBox||n.computeBoundingBox(),e0.set(n.boundingBox.min,n.boundingBox.max,i),o=e0),Z(c,s)){let e=r.geometry,o=e.index,u=e.attributes.position,d=n.index,f=n.attributes.position,p=l[t+6],h=J(c,s);if(eQ.copy(i).invert(),n.boundsTree)return ea(t,a,e1),e1.matrix.copy(eQ),e1.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>e1.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(i),e.b.applyMatrix4(i),e.c.applyMatrix4(i),e.needsUpdate=!0;for(let t=3*p,r=(h+p)*3;t<r;t+=3)if(eq(eJ,t,o,u),eJ.needsUpdate=!0,e.intersectsTriangle(eJ))return!0;return!1}});for(let e=3*p,t=(h+p)*3;e<t;e+=3){eq(eZ,e,o,u),eZ.a.applyMatrix4(eQ),eZ.b.applyMatrix4(eQ),eZ.c.applyMatrix4(eQ),eZ.needsUpdate=!0;for(let e=0,t=d.count;e<t;e+=3)if(eq(eJ,e,d,f),eJ.needsUpdate=!0,eZ.intersectsTriangle(eJ))return!0}}else{let s=t+8,c=l[t+6];return ea(s,a,eK),!!(o.intersectsBox(eK)&&e(s,r,n,i,o))||(ea(c,a,eK),!!(o.intersectsBox(eK)&&e(c,r,n,i,o)))}}(0,e,r,n);return eP.clearBuffer(),i}let e2=new q.Matrix4,e4=new eT,e6=new eT,e5=new q.Vector3,e8=new q.Vector3,e7=new q.Vector3,e9=new q.Vector3;function te(e,t,r,n,i,o,a){let{geometry:s}=r,{index:l}=s,c=s.attributes.position;for(let s=e,u=t+e;s<u;s++){let e;if(eq(a,3*(e=r.resolveTriangleIndex(s)),l,c),a.needsUpdate=!0,n(a,e,i,o))return!0}return!1}function tt(e,t,r,n,i,o,a){eP.setBuffer(e._roots[t]),function e(t,r,n,i,o,a,s){let{float32Array:l,uint16Array:c,uint32Array:u}=eP,d=2*t;if(Z(d,c))!function(e,t,r,n,i,o,a,s){let{geometry:l,_indirectBuffer:c}=e;for(let e=n,u=n+i;e<u;e++)eL(l,t,r,c?c[e]:e,o,a,s)}(r,n,i,u[t+6],J(d,c),o,a,s);else{let c=t+8;eX(c,l,i,a,s)&&e(c,r,n,i,o,a,s);let d=u[t+6];eX(d,l,i,a,s)&&e(d,r,n,i,o,a,s)}}(0,e,r,n,i,o,a),eP.clearBuffer()}let tr=["x","y","z"];function tn(e,t,r,n,i,o){eP.setBuffer(e._roots[t]);let a=function e(t,r,n,i,o,a){let{float32Array:s,uint16Array:l,uint32Array:c}=eP,u=2*t;if(Z(u,l))return function(e,t,r,n,i,o,a){let{geometry:s,_indirectBuffer:l}=e,c=1/0,u=null;for(let e=n,d=n+i;e<d;e++){let n;(n=eL(s,t,r,l?l[e]:e,null,o,a))&&n.distance<c&&(u=n,c=n.distance)}return u}(r,n,i,c[t+6],J(u,l),o,a);{let l,u,d=c[t+7],f=tr[d],p=i.direction[f]>=0;p?(l=t+8,u=c[t+6]):(l=c[t+6],u=t+8);let h=eX(l,s,i,o,a)?e(l,r,n,i,o,a):null;if(h){let e=h.point[f];if(p?e<=s[u+d]:e>=s[u+d+3])return h}let y=eX(u,s,i,o,a)?e(u,r,n,i,o,a):null;return h&&y?h.distance<=y.distance?h:y:h||y||null}}(0,e,r,n,i,o);return eP.clearBuffer(),a}let ti=new q.Box3,to=new eM,ta=new eM,ts=new q.Matrix4,tl=new eT,tc=new eT;function tu(e,t,r,n){eP.setBuffer(e._roots[t]);let i=function e(t,r,n,i,o=null){let{float32Array:a,uint16Array:s,uint32Array:l}=eP,c=2*t;if(null===o&&(n.boundingBox||n.computeBoundingBox(),tl.set(n.boundingBox.min,n.boundingBox.max,i),o=tl),Z(c,s)){let e=r.geometry,o=e.index,u=e.attributes.position,d=n.index,f=n.attributes.position,p=l[t+6],h=J(c,s);if(ts.copy(i).invert(),n.boundsTree)return ea(t,a,tc),tc.matrix.copy(ts),tc.needsUpdate=!0,n.boundsTree.shapecast({intersectsBounds:e=>tc.intersectsBox(e),intersectsTriangle:e=>{e.a.applyMatrix4(i),e.b.applyMatrix4(i),e.c.applyMatrix4(i),e.needsUpdate=!0;for(let t=p,n=h+p;t<n;t++)if(eq(ta,3*r.resolveTriangleIndex(t),o,u),ta.needsUpdate=!0,e.intersectsTriangle(ta))return!0;return!1}});for(let e=p,t=h+p;e<t;e++){eq(to,3*r.resolveTriangleIndex(e),o,u),to.a.applyMatrix4(ts),to.b.applyMatrix4(ts),to.c.applyMatrix4(ts),to.needsUpdate=!0;for(let e=0,t=d.count;e<t;e+=3)if(eq(ta,e,d,f),ta.needsUpdate=!0,to.intersectsTriangle(ta))return!0}}else{let s=t+8,c=l[t+6];return ea(s,a,ti),!!(o.intersectsBox(ti)&&e(s,r,n,i,o))||(ea(c,a,ti),!!(o.intersectsBox(ti)&&e(c,r,n,i,o)))}}(0,e,r,n);return eP.clearBuffer(),i}let td=new q.Matrix4,tf=new eT,tp=new eT,th=new q.Vector3,ty=new q.Vector3,tx=new q.Vector3,tm=new q.Vector3,tv=new eP.constructor,tg=new eP.constructor,tb=new eA(()=>new q.Box3),tw=new q.Box3,tB=new q.Box3,tM=new q.Box3,tT=new q.Box3,tA=!1,tI=new eT,tP=new q.Box3,tD={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class t_{static serialize(e,t={}){t={cloneBuffers:!0,...t};let r=e.geometry,n=e._roots,i=e._indirectBuffer,o=r.getIndex();return t.cloneBuffers?{roots:n.map(e=>e.slice()),index:o?o.array.slice():null,indirectBuffer:i?i.slice():null}:{roots:n,index:o?o.array:null,indirectBuffer:i}}static deserialize(e,t,r={}){r={setIndex:!0,indirect:!!e.indirectBuffer,...r};let{index:n,roots:i,indirectBuffer:o}=e,a=new t_(t,{...r,[K]:!0});if(a._roots=i,a._indirectBuffer=o||null,r.setIndex){let r=t.getIndex();if(null===r){let r=new q.BufferAttribute(e.index,1,!1);t.setIndex(r)}else r.array!==n&&(r.array.set(n),r.needsUpdate=!0)}return a}get indirect(){return!!this._indirectBuffer}constructor(e,o={}){if(e.isBufferGeometry){if(e.index&&e.index.isInterleavedBufferAttribute)throw Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw Error("MeshBVH: Only BufferGeometries are supported.");if((o=Object.assign({...tD,[K]:!1},o)).useSharedArrayBuffer&&"undefined"==typeof SharedArrayBuffer)throw Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=e,this._roots=null,this._indirectBuffer=null,o[K]||(!function(e,o){let a=e.geometry;if(o.indirect){var s;let t,r,n,i;e._indirectBuffer=function(e,t){let r=(e.index?e.index.count:e.attributes.position.count)/3,n=r>65536,i=n?4:2,o=t?new SharedArrayBuffer(r*i):new ArrayBuffer(r*i),a=n?new Uint32Array(o):new Uint16Array(o);for(let e=0,t=a.length;e<t;e++)a[e]=e;return a}(a,o.useSharedArrayBuffer),s=o.range,t=ee(a),(n=(r=en(a,s).sort((e,t)=>e.offset-t.offset))[r.length-1]).count=Math.min(t-n.offset,n.count),i=0,r.forEach(({count:e})=>i+=e),t===i||o.verbose||console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')}e._indirectBuffer||function(e,t){if(!e.index){let r=e.attributes.position.count,n=et(r,t.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);e.setIndex(new q.BufferAttribute(n,1));for(let e=0;e<r;e++)n[e]=e}}(a,o);let l=o.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,c=function(e,t=null,r=null,n=null){let i,o=e.attributes.position,a=e.index?e.index.array:null,s=ee(e),l=o.normalized;null===t?(i=new Float32Array(6*s),r=0,n=s):(i=t,r=r||0,n=n||s);let c=o.array,u=o.offset||0,d=3;o.isInterleavedBufferAttribute&&(d=o.data.stride);let f=["getX","getY","getZ"];for(let e=r;e<r+n;e++){let t=3*e,r=6*e,n=t+0,s=t+1,p=t+2;a&&(n=a[n],s=a[s],p=a[p]),l||(n=n*d+u,s=s*d+u,p=p*d+u);for(let e=0;e<3;e++){let t,a,u;l?(t=o[f[e]](n),a=o[f[e]](s),u=o[f[e]](p)):(t=c[n+e],a=c[s+e],u=c[p+e]);let d=t;a<d&&(d=a),u<d&&(d=u);let h=t;a>h&&(h=a),u>h&&(h=u);let y=(h-d)/2,x=2*e;i[r+x+0]=d+y,i[r+x+1]=y+(Math.abs(d)+y)*5960464477539063e-23}}return i}(a);e._roots=(o.indirect?er(a,o.range):en(a,o.range)).map(a=>{let s=function(e,t,r,n,i){let{maxDepth:o,verbose:a,maxLeafTris:s,strategy:l,onProgress:c,indirect:u}=i,d=e._indirectBuffer,f=e.geometry,p=f.index?f.index.array:null,h=u?ex:ey,y=ee(f),x=new Float32Array(6),m=!1,v=new eh;return eo(t,r,n,v.boundingData,x),function e(r,n,i,c=null,u=0){if(!m&&u>=o&&(m=!0,a&&(console.warn(`MeshBVH: Max depth of ${o} reached when generating BVH. Consider increasing maxDepth.`),console.warn(f))),i<=s||u>=o)return g(n+i),r.offset=n,r.count=i,r;let y=function(e,t,r,n,i,o){let a=-1,s=0;if(0===o)-1!==(a=es(t))&&(s=(t[a]+t[a+3])/2);else if(1===o)-1!==(a=es(e))&&(s=function(e,t,r,n){let i=0;for(let o=t,a=t+r;o<a;o++)i+=e[6*o+2*n];return i/r}(r,n,i,a));else if(2===o){let o=eu(e),c=1.25*i,u=6*n,d=(n+i)*6;for(let e=0;e<3;e++){let n=t[e],f=(t[e+3]-n)/32;if(i<8){let t=[...ef];t.length=i;let n=0;for(let i=u;i<d;i+=6,n++){let o=t[n];o.candidate=r[i+2*e],o.count=0;let{bounds:a,leftCacheBounds:s,rightCacheBounds:l}=o;for(let e=0;e<3;e++)l[e]=1/0,l[e+3]=-1/0,s[e]=1/0,s[e+3]=-1/0,a[e]=1/0,a[e+3]=-1/0;ec(i,r,a)}t.sort(ed);let l=i;for(let e=0;e<l;e++){let r=t[e];for(;e+1<l&&t[e+1].candidate===r.candidate;)t.splice(e+1,1),l--}for(let n=u;n<d;n+=6){let i=r[n+2*e];for(let e=0;e<l;e++){let o=t[e];i>=o.candidate?ec(n,r,o.rightCacheBounds):(ec(n,r,o.leftCacheBounds),o.count++)}}for(let r=0;r<l;r++){let n=t[r],l=n.count,u=i-n.count,d=n.leftCacheBounds,f=n.rightCacheBounds,p=0;0!==l&&(p=eu(d)/o);let h=0;0!==u&&(h=eu(f)/o);let y=1+1.25*(p*l+h*u);y<c&&(a=e,c=y,s=n.candidate)}}else{var l;for(let e=0;e<32;e++){let t=ef[e];t.count=0,t.candidate=n+f+e*f;let r=t.bounds;for(let e=0;e<3;e++)r[e]=1/0,r[e+3]=-1/0}for(let t=u;t<d;t+=6){let i=~~((r[t+2*e]-n)/f);i>=32&&(i=31);let o=ef[i];o.count++,ec(t,r,o.bounds)}let t=ef[31];l=t.bounds,t.rightCacheBounds.set(l);for(let e=30;e>=0;e--){let t=ef[e],r=ef[e+1];el(t.bounds,r.rightCacheBounds,t.rightCacheBounds)}let p=0;for(let t=0;t<31;t++){let r=ef[t],n=r.count,l=r.bounds,u=ef[t+1].rightCacheBounds;0!==n&&(0===p?ep.set(l):el(l,ep,ep));let d=0,f=0;0!==(p+=n)&&(d=eu(ep)/o);let h=i-p;0!==h&&(f=eu(u)/o);let y=1+1.25*(d*p+f*h);y<c&&(a=e,c=y,s=r.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${o} used.`);return{axis:a,pos:s}}(r.boundingData,c,t,n,i,l);if(-1===y.axis)return g(n+i),r.offset=n,r.count=i,r;let v=h(d,p,t,n,i,y);if(v===n||v===n+i)g(n+i),r.offset=n,r.count=i;else{r.splitAxis=y.axis;let o=new eh,a=v-n;r.left=o,eo(t,n,a,o.boundingData,x),e(o,n,a,x,u+1);let s=new eh,l=i-a;r.right=s,eo(t,v,l,s.boundingData,x),e(s,v,l,x,u+1)}return r}(v,r,n,x),v;function g(e){c&&c(e/y)}}(e,c,a.offset,a.count,o),u=new l(32*function e(t){return"count"in t?1:1+e(t.left)+e(t.right)}(s));return t=new Float32Array(u),r=new Uint32Array(u),n=new Uint16Array(u),i=new Uint8Array(u),function e(o,a){let s=o/4,l=o/2,c="count"in a,u=a.boundingData;for(let e=0;e<6;e++)t[s+e]=u[e];if(c)if(a.buffer){let e=a.buffer;i.set(new Uint8Array(e),o);for(let t=o,i=o+e.byteLength;t<i;t+=32)Z(t/2,n)||(r[t/4+6]+=s);return o+e.byteLength}else{let e=a.offset,t=a.count;return r[s+6]=e,n[l+14]=t,n[l+15]=65535,o+32}{let t,n=a.left,i=a.right,l=a.splitAxis;if((t=e(o+32,n))/4>0x100000000)throw Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return r[s+6]=t/4,t=e(t,i),r[s+7]=l,t}}(0,s),u})}(this,o),!e.boundingBox&&o.setBoundingBox&&(e.boundingBox=this.getBoundingBox(new q.Box3))),this.resolveTriangleIndex=o.indirect?e=>this._indirectBuffer[e]:e=>e}refit(e=null){return(this.indirect?function(e,t=null){let r,n,i,o;t&&Array.isArray(t)&&(t=new Set(t));let a=e.geometry,s=a.index?a.index.array:null,l=a.attributes.position,c=0,u=e._roots;for(let a=0,d=u.length;a<d;a++)n=new Uint32Array(r=u[a]),i=new Uint16Array(r),o=new Float32Array(r),function r(a,c,u=!1){let d=2*a;if(65535===i[d+15]){let t=n[a+6],r=i[d+14],c=1/0,u=1/0,f=1/0,p=-1/0,h=-1/0,y=-1/0;for(let n=t,i=t+r;n<i;n++){let t=3*e.resolveTriangleIndex(n);for(let e=0;e<3;e++){let r=t+e;r=s?s[r]:r;let n=l.getX(r),i=l.getY(r),o=l.getZ(r);n<c&&(c=n),n>p&&(p=n),i<u&&(u=i),i>h&&(h=i),o<f&&(f=o),o>y&&(y=o)}}return(o[a+0]!==c||o[a+1]!==u||o[a+2]!==f||o[a+3]!==p||o[a+4]!==h||o[a+5]!==y)&&(o[a+0]=c,o[a+1]=u,o[a+2]=f,o[a+3]=p,o[a+4]=h,o[a+5]=y,!0)}{let e=a+8,i=n[a+6],s=e+c,l=i+c,d=u,f=!1,p=!1;t?d||(f=t.has(s),p=t.has(l),d=!f&&!p):(f=!0,p=!0);let h=d||f,y=d||p,x=!1;h&&(x=r(e,c,d));let m=!1;y&&(m=r(i,c,d));let v=x||m;if(v)for(let t=0;t<3;t++){let r=e+t,n=i+t,s=o[r],l=o[r+3],c=o[n],u=o[n+3];o[a+t]=s<c?s:c,o[a+t+3]=l>u?l:u}return v}}(0,c),c+=r.byteLength}:function(e,t=null){let r,n,i,o;t&&Array.isArray(t)&&(t=new Set(t));let a=e.geometry,s=a.index?a.index.array:null,l=a.attributes.position,c=0,u=e._roots;for(let e=0,a=u.length;e<a;e++)n=new Uint32Array(r=u[e]),i=new Uint16Array(r),o=new Float32Array(r),function e(r,a,c=!1){let u=2*r;if(65535===i[u+15]){let e=n[r+6],t=i[u+14],a=1/0,c=1/0,d=1/0,f=-1/0,p=-1/0,h=-1/0;for(let r=3*e,n=3*(e+t);r<n;r++){let e=s[r],t=l.getX(e),n=l.getY(e),i=l.getZ(e);t<a&&(a=t),t>f&&(f=t),n<c&&(c=n),n>p&&(p=n),i<d&&(d=i),i>h&&(h=i)}return(o[r+0]!==a||o[r+1]!==c||o[r+2]!==d||o[r+3]!==f||o[r+4]!==p||o[r+5]!==h)&&(o[r+0]=a,o[r+1]=c,o[r+2]=d,o[r+3]=f,o[r+4]=p,o[r+5]=h,!0)}{let i=r+8,s=n[r+6],l=i+a,u=s+a,d=c,f=!1,p=!1;t?d||(f=t.has(l),p=t.has(u),d=!f&&!p):(f=!0,p=!0);let h=d||f,y=d||p,x=!1;h&&(x=e(i,a,d));let m=!1;y&&(m=e(s,a,d));let v=x||m;if(v)for(let e=0;e<3;e++){let t=i+e,n=s+e,a=o[t],l=o[t+3],c=o[n],u=o[n+3];o[r+e]=a<c?a:c,o[r+e+3]=l>u?l:u}return v}}(0,c),c+=r.byteLength})(this,e)}traverse(e,t=0){let r=this._roots[t],n=new Uint32Array(r),i=new Uint16Array(r);!function t(o,a=0){let s=2*o,l=65535===i[s+15];if(l){let t=n[o+6],c=i[s+14];e(a,l,new Float32Array(r,4*o,6),t,c)}else{let i=n[o+6],s=n[o+7];e(a,l,new Float32Array(r,4*o,6),s)||(t(o+8,a+1),t(i,a+1))}}(0)}raycast(e,t=q.FrontSide,r=0,n=1/0){let i=this._roots,o=this.geometry,a=[],s=t.isMaterial,l=Array.isArray(t),c=o.groups,u=s?t.side:t,d=this.indirect?tt:eW;for(let o=0,s=i.length;o<s;o++){let i=l?t[c[o].materialIndex].side:u,s=a.length;if(d(this,o,i,e,a,r,n),l){let e=c[o].materialIndex;for(let t=s,r=a.length;t<r;t++)a[t].face.materialIndex=e}}return a}raycastFirst(e,t=q.FrontSide,r=0,n=1/0){let i=this._roots,o=this.geometry,a=t.isMaterial,s=Array.isArray(t),l=null,c=o.groups,u=a?t.side:t,d=this.indirect?tn:e$;for(let o=0,a=i.length;o<a;o++){let i=s?t[c[o].materialIndex].side:u,a=d(this,o,i,e,r,n);null!=a&&(null==l||a.distance<l.distance)&&(l=a,s&&(a.face.materialIndex=c[o].materialIndex))}return l}intersectsGeometry(e,t){let r=!1,n=this._roots,i=this.indirect?tu:e3;for(let o=0,a=n.length;o<a&&!(r=i(this,o,e,t));o++);return r}shapecast(e){let t=eI.getPrimitive(),r=this.indirect?te:eY,{boundsTraverseOrder:n,intersectsBounds:i,intersectsRange:s,intersectsTriangle:l}=e;if(s&&l){let e=s;s=(n,i,o,a,s)=>!!e(n,i,o,a,s)||r(n,i,this,l,o,a,t)}else s||(s=l?(e,n,i,o)=>r(e,n,this,l,i,o,t):(e,t,r)=>r);let c=!1,u=0,d=this._roots;for(let e=0,t=d.length;e<t;e++){let t=d[e];if(c=function(e,t,r,n,i,s){o=e_.getPrimitive(),a=e_.getPrimitive(),eD.push(o,a),eP.setBuffer(e._roots[t]);let l=function e(t,r,n,i,s=null,l=0,c=0){let{float32Array:u,uint16Array:d,uint32Array:f}=eP,p=2*t;if(Z(p,d)){let e=f[t+6],r=J(p,d);return ea(t,u,o),i(e,r,!1,c,l+t,o)}{let p,x,m,v,g,b,w=t+8,B=f[t+6],M=w,T=B;if(s&&(m=o,v=a,ea(M,u,m),ea(T,u,v),p=s(m),(x=s(v))<p)){M=B,T=w;let e=p;p=x,x=e,m=v}m||ea(M,u,m=o);let A=n(m,Z(2*M,d),p,c+1,l+M);if(2===A){let e=h(M);g=i(e,y(M)-e,!0,c+1,l+M,m)}else g=A&&e(M,r,n,i,s,l,c+1);if(g)return!0;ea(T,u,v=a);let I=n(v,Z(2*T,d),x,c+1,l+T);if(2===I){let e=h(T);b=i(e,y(T)-e,!0,c+1,l+T,v)}else b=I&&e(T,r,n,i,s,l,c+1);if(b)return!0;return!1;function h(e){let{uint16Array:t,uint32Array:r}=eP,n=2*e;for(;!Z(n,t);)n=2*(e+=8);return r[e+6]}function y(e){let{uint16Array:t,uint32Array:r}=eP,n=2*e;for(;!Z(n,t);)n=2*(e=r[e+6]);return r[e+6]+J(n,t)}}}(0,e.geometry,r,n,i,s);eP.clearBuffer(),e_.releasePrimitive(o),e_.releasePrimitive(a),eD.pop(),eD.pop();let c=eD.length;return c>0&&(a=eD[c-1],o=eD[c-2]),l}(this,e,i,s,n,u))break;u+=t.byteLength}return eI.releasePrimitive(t),c}bvhcast(e,t,r){let{intersectsRanges:n,intersectsTriangles:i}=r,o=eI.getPrimitive(),a=this.geometry.index,s=this.geometry.attributes.position,l=this.indirect?e=>{eq(o,3*this.resolveTriangleIndex(e),a,s)}:e=>{eq(o,3*e,a,s)},c=eI.getPrimitive(),u=e.geometry.index,d=e.geometry.attributes.position,f=e.indirect?t=>{eq(c,3*e.resolveTriangleIndex(t),u,d)}:e=>{eq(c,3*e,u,d)};if(i){let e=(e,r,n,a,s,u,d,p)=>{for(let h=n,y=n+a;h<y;h++){f(h),c.a.applyMatrix4(t),c.b.applyMatrix4(t),c.c.applyMatrix4(t),c.needsUpdate=!0;for(let t=e,n=e+r;t<n;t++)if(l(t),o.needsUpdate=!0,i(o,c,t,h,s,u,d,p))return!0}return!1};if(n){let t=n;n=function(r,n,i,o,a,s,l,c){return!!t(r,n,i,o,a,s,l,c)||e(r,n,i,o,a,s,l,c)}}else n=e}return function(e,t,r,n){let i;if(tA)throw Error("MeshBVH: Recursive calls to bvhcast not supported.");tA=!0;let o=e._roots,a=t._roots,s=0,l=0,c=new q.Matrix4().copy(r).invert();for(let e=0,t=o.length;e<t;e++){tv.setBuffer(o[e]),l=0;let t=tb.getPrimitive();ea(0,tv.float32Array,t),t.applyMatrix4(c);for(let e=0,o=a.length;e<o&&(tg.setBuffer(a[e]),i=function e(t,r,n,i,o,a=0,s=0,l=0,c=0,u=null,d=!1){let f,p;d?(f=tg,p=tv):(f=tv,p=tg);let h=f.float32Array,y=f.uint32Array,x=f.uint16Array,m=p.float32Array,v=p.uint32Array,g=p.uint16Array,b=2*r,w=Z(2*t,x),B=Z(b,g),M=!1;if(B&&w)M=d?o(v[r+6],J(2*r,g),y[t+6],J(2*t,x),c,s+r,l,a+t):o(y[t+6],J(2*t,x),v[r+6],J(2*r,g),l,a+t,c,s+r);else if(B){let u=tb.getPrimitive();ea(r,m,u),u.applyMatrix4(n);let f=t+8,p=y[t+6];ea(f,h,tw),ea(p,h,tB);let x=u.intersectsBox(tw),v=u.intersectsBox(tB);M=x&&e(r,f,i,n,o,s,a,c,l+1,u,!d)||v&&e(r,p,i,n,o,s,a,c,l+1,u,!d),tb.releasePrimitive(u)}else{let f=r+8,p=v[r+6];ea(f,m,tM),ea(p,m,tT);let x=u.intersectsBox(tM),g=u.intersectsBox(tT);if(x&&g)M=e(t,f,n,i,o,a,s,l,c+1,u,d)||e(t,p,n,i,o,a,s,l,c+1,u,d);else if(x)if(w)M=e(t,f,n,i,o,a,s,l,c+1,u,d);else{let r=tb.getPrimitive();r.copy(tM).applyMatrix4(n);let u=t+8,p=y[t+6];ea(u,h,tw),ea(p,h,tB);let x=r.intersectsBox(tw),m=r.intersectsBox(tB);M=x&&e(f,u,i,n,o,s,a,c,l+1,r,!d)||m&&e(f,p,i,n,o,s,a,c,l+1,r,!d),tb.releasePrimitive(r)}else if(g)if(w)M=e(t,p,n,i,o,a,s,l,c+1,u,d);else{let r=tb.getPrimitive();r.copy(tT).applyMatrix4(n);let u=t+8,f=y[t+6];ea(u,h,tw),ea(f,h,tB);let x=r.intersectsBox(tw),m=r.intersectsBox(tB);M=x&&e(p,u,i,n,o,s,a,c,l+1,r,!d)||m&&e(p,f,i,n,o,s,a,c,l+1,r,!d),tb.releasePrimitive(r)}}return M}(0,0,r,c,n,s,l,0,0,t),tg.clearBuffer(),l+=a[e].length,!i);e++);if(tb.releasePrimitive(t),tv.clearBuffer(),s+=o[e].length,i)break}return tA=!1,i}(this,e,t,n)}intersectsBox(e,t){return tI.set(e.min,e.max,t),tI.needsUpdate=!0,this.shapecast({intersectsBounds:e=>tI.intersectsBox(e),intersectsTriangle:e=>tI.intersectsTriangle(e)})}intersectsSphere(e){return this.shapecast({intersectsBounds:t=>e.intersectsBox(t),intersectsTriangle:t=>t.intersectsSphere(e)})}closestPointToGeometry(e,t,r={},n={},i=0,o=1/0){return(this.indirect?function(e,t,r,n={},i={},o=0,a=1/0){t.boundingBox||t.computeBoundingBox(),tf.set(t.boundingBox.min,t.boundingBox.max,r),tf.needsUpdate=!0;let s=e.geometry,l=s.attributes.position,c=s.index,u=t.attributes.position,d=t.index,f=eI.getPrimitive(),p=eI.getPrimitive(),h=null,y=null;i&&(h=tx,y=tm);let x=1/0,m=null,v=null;return(td.copy(r).invert(),tp.matrix.copy(td),e.shapecast({boundsTraverseOrder:e=>tf.distanceToBox(e),intersectsBounds:(e,t,r)=>r<x&&r<a&&(t&&(tp.min.copy(e.min),tp.max.copy(e.max),tp.needsUpdate=!0),!0),intersectsRange:(n,i)=>{if(t.boundsTree){let s=t.boundsTree;return s.shapecast({boundsTraverseOrder:e=>tp.distanceToBox(e),intersectsBounds:(e,t,r)=>r<x&&r<a,intersectsRange:(t,a)=>{for(let g=t,b=t+a;g<b;g++){eq(p,3*s.resolveTriangleIndex(g),d,u),p.a.applyMatrix4(r),p.b.applyMatrix4(r),p.c.applyMatrix4(r),p.needsUpdate=!0;for(let t=n,r=n+i;t<r;t++){eq(f,3*e.resolveTriangleIndex(t),c,l),f.needsUpdate=!0;let r=f.distanceToTriangle(p,th,h);if(r<x&&(ty.copy(th),y&&y.copy(h),x=r,m=t,v=g),r<o)return!0}}}})}{let a=ee(t);for(let t=0;t<a;t++){eq(p,3*t,d,u),p.a.applyMatrix4(r),p.b.applyMatrix4(r),p.c.applyMatrix4(r),p.needsUpdate=!0;for(let r=n,a=n+i;r<a;r++){eq(f,3*e.resolveTriangleIndex(r),c,l),f.needsUpdate=!0;let n=f.distanceToTriangle(p,th,h);if(n<x&&(ty.copy(th),y&&y.copy(h),x=n,m=r,v=t),n<o)return!0}}}}}),eI.releasePrimitive(f),eI.releasePrimitive(p),x===1/0)?null:(n.point?n.point.copy(ty):n.point=ty.clone(),n.distance=x,n.faceIndex=m,i&&(i.point?i.point.copy(y):i.point=y.clone(),i.point.applyMatrix4(td),ty.applyMatrix4(td),i.distance=ty.sub(i.point).length(),i.faceIndex=v),n)}:function(e,t,r,n={},i={},o=0,a=1/0){t.boundingBox||t.computeBoundingBox(),e4.set(t.boundingBox.min,t.boundingBox.max,r),e4.needsUpdate=!0;let s=e.geometry,l=s.attributes.position,c=s.index,u=t.attributes.position,d=t.index,f=eI.getPrimitive(),p=eI.getPrimitive(),h=null,y=null;i&&(h=e7,y=e9);let x=1/0,m=null,v=null;return(e2.copy(r).invert(),e6.matrix.copy(e2),e.shapecast({boundsTraverseOrder:e=>e4.distanceToBox(e),intersectsBounds:(e,t,r)=>r<x&&r<a&&(t&&(e6.min.copy(e.min),e6.max.copy(e.max),e6.needsUpdate=!0),!0),intersectsRange:(e,n)=>{if(t.boundsTree)return t.boundsTree.shapecast({boundsTraverseOrder:e=>e6.distanceToBox(e),intersectsBounds:(e,t,r)=>r<x&&r<a,intersectsRange:(t,i)=>{for(let a=t,s=t+i;a<s;a++){eq(p,3*a,d,u),p.a.applyMatrix4(r),p.b.applyMatrix4(r),p.c.applyMatrix4(r),p.needsUpdate=!0;for(let t=e,r=e+n;t<r;t++){eq(f,3*t,c,l),f.needsUpdate=!0;let e=f.distanceToTriangle(p,e5,h);if(e<x&&(e8.copy(e5),y&&y.copy(h),x=e,m=t,v=a),e<o)return!0}}}});{let i=ee(t);for(let t=0;t<i;t++){eq(p,3*t,d,u),p.a.applyMatrix4(r),p.b.applyMatrix4(r),p.c.applyMatrix4(r),p.needsUpdate=!0;for(let r=e,i=e+n;r<i;r++){eq(f,3*r,c,l),f.needsUpdate=!0;let e=f.distanceToTriangle(p,e5,h);if(e<x&&(e8.copy(e5),y&&y.copy(h),x=e,m=r,v=t),e<o)return!0}}}}}),eI.releasePrimitive(f),eI.releasePrimitive(p),x===1/0)?null:(n.point?n.point.copy(e8):n.point=e8.clone(),n.distance=x,n.faceIndex=m,i&&(i.point?i.point.copy(y):i.point=y.clone(),i.point.applyMatrix4(e2),e8.applyMatrix4(e2),i.distance=e8.sub(i.point).length(),i.faceIndex=v),n)})(this,e,t,r,n,i,o)}closestPointToPoint(e,t={},r=0,n=1/0){return function(e,t,r={},n=0,i=1/0){let o=n*n,a=i*i,s=1/0,l=null;if(e.shapecast({boundsTraverseOrder:e=>(eF.copy(t).clamp(e.min,e.max),eF.distanceToSquared(t)),intersectsBounds:(e,t,r)=>r<s&&r<a,intersectsTriangle:(e,r)=>{e.closestPointToPoint(t,eF);let n=t.distanceToSquared(eF);return n<s&&(eS.copy(eF),s=n,l=r),n<o}}),s===1/0)return null;let c=Math.sqrt(s);return r.point?r.point.copy(eS):r.point=eS.clone(),r.distance=c,r.faceIndex=l,r}(this,e,t,r,n)}getBoundingBox(e){return e.makeEmpty(),this._roots.forEach(t=>{ea(0,new Float32Array(t),tP),e.union(tP)}),e}}var tF=e.i(81640);let tS=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,tU=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,tV=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define\
	bvhIntersectFirstHit(\
		bvh,\
		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist\
	)\
	_bvhIntersectFirstHit(\
		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,\
		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist\
	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,tC=`
	${tU}
	${tV}
`;var tN=e.i(24162);let tz=(0,tF.shaderMaterial)({envMap:null,bounces:3,ior:2.4,correctMips:!0,aberrationStrength:.01,fresnel:0,bvh:new ei,color:new q.Color("white"),opacity:1,resolution:new q.Vector2,viewMatrixInverse:new q.Matrix4,projectionMatrixInverse:new q.Matrix4},`
  uniform mat4 viewMatrixInverse;

  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 vModelMatrixInverse;

  #include <color_pars_vertex>

  void main() {
    #include <color_vertex>

    vec4 transformedNormal = vec4(normal, 0.0);
    vec4 transformedPosition = vec4(position, 1.0);
    #ifdef USE_INSTANCING
      transformedNormal = instanceMatrix * transformedNormal;
      transformedPosition = instanceMatrix * transformedPosition;
    #endif

    #ifdef USE_INSTANCING
      vModelMatrixInverse = inverse(modelMatrix * instanceMatrix);
    #else
      vModelMatrixInverse = inverse(modelMatrix);
    #endif

    vWorldPosition = (modelMatrix * transformedPosition).xyz;
    vNormal = normalize((viewMatrixInverse * vec4(normalMatrix * transformedNormal.xyz, 0.0)).xyz);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * transformedPosition;
  }`,`
  #define ENVMAP_TYPE_CUBE_UV
  precision highp isampler2D;
  precision highp usampler2D;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  varying mat4 vModelMatrixInverse;

  #include <color_pars_fragment>

  #ifdef ENVMAP_TYPE_CUBEM
    uniform samplerCube envMap;
  #else
    uniform sampler2D envMap;
  #endif

  uniform float bounces;
  ${tS}
  ${tC}
  uniform BVH bvh;
  uniform float ior;
  uniform bool correctMips;
  uniform vec2 resolution;
  uniform float fresnel;
  uniform mat4 modelMatrix;
  uniform mat4 projectionMatrixInverse;
  uniform mat4 viewMatrixInverse;
  uniform float aberrationStrength;
  uniform vec3 color;
  uniform float opacity;

  float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
    return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
  }

  vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
    vec3 rayOrigin = ro;
    vec3 rayDirection = rd;
    rayDirection = refract(rayDirection, normal, 1.0 / ior);
    rayOrigin = vWorldPosition + rayDirection * 0.001;
    rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
    rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
    for(float i = 0.0; i < bounces; i++) {
      uvec4 faceIndices = uvec4( 0u );
      vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
      vec3 barycoord = vec3( 0.0 );
      float side = 1.0;
      float dist = 0.0;
      bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
      vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
      vec3 tempDir = refract(rayDirection, faceNormal, ior);
      if (length(tempDir) != 0.0) {
        rayDirection = tempDir;
        break;
      }
      rayDirection = reflect(rayDirection, faceNormal);
      rayOrigin = hitPos + rayDirection * 0.01;
    }
    rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
    return rayDirection;
  }

  #include <common>
  #include <cube_uv_reflection_fragment>

  #ifdef ENVMAP_TYPE_CUBEM
    vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
    }
  #else
    vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
      vec2 uvv = equirectUv( rayDirection );
      vec2 smoothUv = equirectUv( directionCamPerfect );
      return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
    }
  #endif

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    vec3 directionCamPerfect = (projectionMatrixInverse * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
    directionCamPerfect = (viewMatrixInverse * vec4(directionCamPerfect, 0.0)).xyz;
    directionCamPerfect = normalize(directionCamPerfect);
    vec3 normal = vNormal;
    vec3 rayOrigin = cameraPosition;
    vec3 rayDirection = normalize(vWorldPosition - cameraPosition);

    vec4 diffuseColor = vec4(color, opacity);
    #include <color_fragment>

    #ifdef CHROMATIC_ABERRATIONS
      vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
      #ifdef FAST_CHROMA
        vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
        vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
      #else
        vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), vModelMatrixInverse);
        vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), vModelMatrixInverse);
      #endif
      float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
      float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
      float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
      diffuseColor.rgb *= vec3(finalColorR, finalColorG, finalColorB);
    #else
      rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
      diffuseColor.rgb *= textureGradient(envMap, rayDirection, directionCamPerfect).rgb;
    #endif

    vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
    float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
    gl_FragColor = vec4(mix(diffuseColor.rgb, vec3(1.0), nFresnel), diffuseColor.a);

    #include <tonemapping_fragment>
    #include <${tN.version>=154?"colorspace_fragment":"encodings_fragment"}>
  }`);function tE({aberrationStrength:e=0,fastChroma:t=!0,envMap:r,...n}){(0,G.extend)({MeshRefractionMaterial:tz});let i=(0,H.useRef)(null),{size:o}=(0,k.useThree)(),a=(0,H.useMemo)(()=>{var n,i;let o={},a=r&&r.isCubeTexture,s=Math.floor(Math.log2((null!=(n=a?null==(i=r.image[0])?void 0:i.width:r.image.width)?n:1024)/4)),l=Math.pow(2,s),c=3*Math.max(l,112);return a&&(o.ENVMAP_TYPE_CUBEM=""),o.CUBEUV_TEXEL_WIDTH=`${1/c}`,o.CUBEUV_TEXEL_HEIGHT=`${1/(4*l)}`,o.CUBEUV_MAX_MIP=`${s}.0`,e>0&&(o.CHROMATIC_ABERRATIONS=""),t&&(o.FAST_CHROMA=""),o},[e,t]);return(0,H.useLayoutEffect)(()=>{var e;let t=null==(e=i.current)||null==(e=e.__r3f)||null==(e=e.parent)||null==(e=e.object)?void 0:e.geometry;t&&(i.current.bvh=new ei,i.current.bvh.updateFrom(new t_(t.clone().toNonIndexed(),{strategy:2})))},[]),(0,L.useFrame)(({camera:e})=>{i.current.viewMatrixInverse=e.matrixWorld,i.current.projectionMatrixInverse=e.projectionMatrixInverse}),H.createElement("meshRefractionMaterial",(0,O.default)({key:JSON.stringify(a),defines:a,ref:i,resolution:[o.width,o.height],aberrationStrength:e,envMap:r},n))}e.s(["MeshRefractionMaterial",()=>tE],16748)}]);