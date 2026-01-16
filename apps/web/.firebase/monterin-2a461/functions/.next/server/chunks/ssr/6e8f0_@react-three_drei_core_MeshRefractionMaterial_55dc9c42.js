module.exports=[20678,a=>{"use strict";let b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M;var N=a.i(16429),O=a.i(22767),P=a.i(85044),Q=a.i(17344),R=a.i(53059),S=a.i(10730),T=S;function U(a){switch(a){case 1:return T.RedIntegerFormat;case 2:return T.RGIntegerFormat;case 3:case 4:return T.RGBAIntegerFormat}}class V extends T.DataTexture{constructor(){super(),this.minFilter=T.NearestFilter,this.magFilter=T.NearestFilter,this.generateMipmaps=!1,this.overrideItemSize=null,this._forcedType=null}updateFrom(a){let b,c,d,e,f=this.overrideItemSize,g=a.itemSize,h=a.count;if(null!==f){if(g*h%f!=0)throw Error("VertexAttributeTexture: overrideItemSize must divide evenly into buffer length.");a.itemSize=f,a.count=h*g/f}let i=a.itemSize,j=a.count,k=a.normalized,l=a.array.constructor,m=l.BYTES_PER_ELEMENT,n=this._forcedType,o=i;if(null===n)switch(l){case Float32Array:n=T.FloatType;break;case Uint8Array:case Uint16Array:case Uint32Array:n=T.UnsignedIntType;break;case Int8Array:case Int16Array:case Int32Array:n=T.IntType}let p=function(a){switch(a){case 1:return"R";case 2:return"RG";case 3:case 4:return"RGBA"}throw Error()}(i);switch(n){case T.FloatType:d=1,c=function(a){switch(a){case 1:return T.RedFormat;case 2:return T.RGFormat;case 3:case 4:return T.RGBAFormat}}(i),k&&1===m?(e=l,p+="8",l===Uint8Array?b=T.UnsignedByteType:(b=T.ByteType,p+="_SNORM")):(e=Float32Array,p+="32F",b=T.FloatType);break;case T.IntType:p+=8*m+"I",d=k?Math.pow(2,8*l.BYTES_PER_ELEMENT-1):1,c=U(i),1===m?(e=Int8Array,b=T.ByteType):2===m?(e=Int16Array,b=T.ShortType):(e=Int32Array,b=T.IntType);break;case T.UnsignedIntType:p+=8*m+"UI",d=k?Math.pow(2,8*l.BYTES_PER_ELEMENT-1):1,c=U(i),1===m?(e=Uint8Array,b=T.UnsignedByteType):2===m?(e=Uint16Array,b=T.UnsignedShortType):(e=Uint32Array,b=T.UnsignedIntType)}3===o&&(c===T.RGBAFormat||c===T.RGBAIntegerFormat)&&(o=4);let q=Math.ceil(Math.sqrt(j))||1,r=new e(o*q*q),s=a.normalized;a.normalized=!1;for(let b=0;b<j;b++){let c=o*b;r[c]=a.getX(b)/d,i>=2&&(r[c+1]=a.getY(b)/d),i>=3&&(r[c+2]=a.getZ(b)/d,4===o&&(r[c+3]=1)),i>=4&&(r[c+3]=a.getW(b)/d)}a.normalized=s,this.internalFormat=p,this.format=c,this.type=b,this.image.width=q,this.image.height=q,this.image.data=r,this.needsUpdate=!0,this.dispose(),a.itemSize=g,a.count=h}}class W extends V{constructor(){super(),this._forcedType=T.UnsignedIntType}}class X extends V{constructor(){super(),this._forcedType=T.FloatType}}let Y=Symbol("SKIP_GENERATION");function Z(a,b){return 65535===b[a+15]}function $(a,b){return b[a+14]}function _(a){return a.index?a.index.count:a.attributes.position.count}function aa(a){return _(a)/3}function ab(a,b=ArrayBuffer){return a>65535?new Uint32Array(new b(4*a)):new Uint16Array(new b(2*a))}function ac(a,b){let c=aa(a),d=b||a.drawRange,e=d.start/3,f=(d.start+d.count)/3,g=Math.max(0,e),h=Math.min(c,f)-g;return[{offset:Math.floor(g),count:Math.floor(h)}]}function ad(a,b){if(!a.groups||!a.groups.length)return ac(a,b);let c=[],d=new Set,e=b||a.drawRange,f=e.start/3,g=(e.start+e.count)/3;for(let b of a.groups){let a=b.start/3,c=(b.start+b.count)/3;d.add(Math.max(f,a)),d.add(Math.min(g,c))}let h=Array.from(d.values()).sort((a,b)=>a-b);for(let a=0;a<h.length-1;a++){let b=h[a],d=h[a+1];c.push({offset:Math.floor(b),count:Math.floor(d-b)})}return c}class ae{constructor(){this.index=new W,this.position=new X,this.bvhBounds=new S.DataTexture,this.bvhContents=new S.DataTexture,this._cachedIndexAttr=null,this.index.overrideItemSize=3}updateFrom(a){let{geometry:b}=a;if(function(a,b,c){let d=a._roots;if(1!==d.length)throw Error("MeshBVHUniformStruct: Multi-root BVHs not supported.");let e=d[0],f=new Uint16Array(e),g=new Uint32Array(e),h=new Float32Array(e),i=e.byteLength/32,j=2*Math.ceil(Math.sqrt(i/2)),k=new Float32Array(4*j*j),l=Math.ceil(Math.sqrt(i)),m=new Uint32Array(2*l*l);for(let a=0;a<i;a++){let b=32*a/4,c=2*b;for(let c=0;c<3;c++)k[8*a+0+c]=h[b+0+c],k[8*a+4+c]=h[b+3+c];if(Z(c,f)){let d=$(c,f),e=g[b+6],h=0xffff0000|d;m[2*a+0]=h,m[2*a+1]=e}else{let c=4*g[b+6]/32,d=g[b+7];m[2*a+0]=d,m[2*a+1]=c}}b.image.data=k,b.image.width=j,b.image.height=j,b.format=S.RGBAFormat,b.type=S.FloatType,b.internalFormat="RGBA32F",b.minFilter=S.NearestFilter,b.magFilter=S.NearestFilter,b.generateMipmaps=!1,b.needsUpdate=!0,b.dispose(),c.image.data=m,c.image.width=l,c.image.height=l,c.format=S.RGIntegerFormat,c.type=S.UnsignedIntType,c.internalFormat="RG32UI",c.minFilter=S.NearestFilter,c.magFilter=S.NearestFilter,c.generateMipmaps=!1,c.needsUpdate=!0,c.dispose()}(a,this.bvhBounds,this.bvhContents),this.position.updateFrom(b.attributes.position),a.indirect){let c=a._indirectBuffer;if(null===this._cachedIndexAttr||this._cachedIndexAttr.count!==c.length)if(b.index)this._cachedIndexAttr=b.index.clone();else{let a=ab(_(b));this._cachedIndexAttr=new S.BufferAttribute(a,1,!1)}(function(a,b,c){let d=c.array,e=a.index?a.index.array:null;for(let a=0,c=b.length;a<c;a++){let c=3*a,f=3*b[a];for(let a=0;a<3;a++)d[c+a]=e?e[f+a]:f+a}})(b,c,this._cachedIndexAttr),this.index.updateFrom(this._cachedIndexAttr)}else this.index.updateFrom(b.index)}dispose(){let{index:a,position:b,bvhBounds:c,bvhContents:d}=this;a&&a.dispose(),b&&b.dispose(),c&&c.dispose(),d&&d.dispose()}}function af(a,b,c,d,e){let f=1/0,g=1/0,h=1/0,i=-1/0,j=-1/0,k=-1/0,l=1/0,m=1/0,n=1/0,o=-1/0,p=-1/0,q=-1/0;for(let d=6*b,e=(b+c)*6;d<e;d+=6){let b=a[d+0],c=a[d+1],e=b-c,r=b+c;e<f&&(f=e),r>i&&(i=r),b<l&&(l=b),b>o&&(o=b);let s=a[d+2],t=a[d+3],u=s-t,v=s+t;u<g&&(g=u),v>j&&(j=v),s<m&&(m=s),s>p&&(p=s);let w=a[d+4],x=a[d+5],y=w-x,z=w+x;y<h&&(h=y),z>k&&(k=z),w<n&&(n=w),w>q&&(q=w)}d[0]=f,d[1]=g,d[2]=h,d[3]=i,d[4]=j,d[5]=k,e[0]=l,e[1]=m,e[2]=n,e[3]=o,e[4]=p,e[5]=q}function ag(a,b,c){return c.min.x=b[a],c.min.y=b[a+1],c.min.z=b[a+2],c.max.x=b[a+3],c.max.y=b[a+4],c.max.z=b[a+5],c}function ah(a){let b=-1,c=-1/0;for(let d=0;d<3;d++){let e=a[d+3]-a[d];e>c&&(c=e,b=d)}return b}function ai(a,b,c){let d,e;for(let f=0;f<3;f++){let g=f+3;d=a[f],e=b[f],c[f]=d<e?d:e,d=a[g],e=b[g],c[g]=d>e?d:e}}function aj(a,b,c){for(let d=0;d<3;d++){let e=b[a+2*d],f=b[a+2*d+1],g=e-f,h=e+f;g<c[d]&&(c[d]=g),h>c[d+3]&&(c[d+3]=h)}}function ak(a){let b=a[3]-a[0],c=a[4]-a[1],d=a[5]-a[2];return 2*(b*c+c*d+d*b)}let al=(a,b)=>a.candidate-b.candidate,am=Array(32).fill().map(()=>({count:0,bounds:new Float32Array(6),rightCacheBounds:new Float32Array(6),leftCacheBounds:new Float32Array(6),candidate:0})),an=new Float32Array(6);class ao{constructor(){this.boundingData=new Float32Array(6)}}function ap(a,b,c,d,e,f){let g=d,h=d+e-1,i=f.pos,j=2*f.axis;for(;;){for(;g<=h&&c[6*g+j]<i;)g++;for(;g<=h&&c[6*h+j]>=i;)h--;if(!(g<h))return g;for(let a=0;a<3;a++){let c=b[3*g+a];b[3*g+a]=b[3*h+a],b[3*h+a]=c}for(let a=0;a<6;a++){let b=c[6*g+a];c[6*g+a]=c[6*h+a],c[6*h+a]=b}g++,h--}}function aq(a,b,c,d,e,f){let g=d,h=d+e-1,i=f.pos,j=2*f.axis;for(;;){for(;g<=h&&c[6*g+j]<i;)g++;for(;g<=h&&c[6*h+j]>=i;)h--;if(!(g<h))return g;{let b=a[g];a[g]=a[h],a[h]=b;for(let a=0;a<6;a++){let b=c[6*g+a];c[6*g+a]=c[6*h+a],c[6*h+a]=b}g++,h--}}}class ar{constructor(){this.min=1/0,this.max=-1/0}setFromPointsField(a,b){let c=1/0,d=-1/0;for(let e=0,f=a.length;e<f;e++){let f=a[e][b];c=f<c?f:c,d=f>d?f:d}this.min=c,this.max=d}setFromPoints(a,b){let c=1/0,d=-1/0;for(let e=0,f=b.length;e<f;e++){let f=b[e],g=a.dot(f);c=g<c?g:c,d=g>d?g:d}this.min=c,this.max=d}isSeparated(a){return this.min>a.max||a.min>this.max}}ar.prototype.setFromBox=(h=new S.Vector3,function(a,b){let c=b.min,d=b.max,e=1/0,f=-1/0;for(let b=0;b<=1;b++)for(let g=0;g<=1;g++)for(let i=0;i<=1;i++){h.x=c.x*b+d.x*(1-b),h.y=c.y*g+d.y*(1-g),h.z=c.z*i+d.z*(1-i);let j=a.dot(h);e=Math.min(j,e),f=Math.max(j,f)}this.min=e,this.max=f}),new ar;var as=S;let at=(i=new S.Vector3,j=new S.Vector3,k=new S.Vector3,function(a,b,c){let d,e,f=a.start,g=b.start;k.subVectors(f,g),i.subVectors(a.end,a.start),j.subVectors(b.end,b.start);let h=k.dot(j),l=j.dot(i),m=j.dot(j),n=k.dot(i),o=i.dot(i)*m-l*l;d=0!==o?(h*l-n*m)/o:0,e=(h+d*l)/m,c.x=d,c.y=e}),au=(l=new S.Vector2,m=new S.Vector3,n=new S.Vector3,function(a,b,c,d){at(a,b,l);let e=l.x,f=l.y;if(e>=0&&e<=1&&f>=0&&f<=1){a.at(e,c),b.at(f,d);return}if(e>=0&&e<=1){f<0?b.at(0,d):b.at(1,d),a.closestPointToPoint(d,!0,c);return}if(f>=0&&f<=1){e<0?a.at(0,c):a.at(1,c),b.closestPointToPoint(c,!0,d);return}{let g,h;if(g=e<0?a.start:a.end,h=f<0?b.start:b.end,a.closestPointToPoint(h,!0,m),b.closestPointToPoint(g,!0,n),m.distanceToSquared(h)<=n.distanceToSquared(g)){c.copy(m),d.copy(h);return}c.copy(g),d.copy(n);return}}),av=(o=new S.Vector3,p=new S.Vector3,q=new S.Plane,r=new S.Line3,function(a,b){let{radius:c,center:d}=a,{a:e,b:f,c:g}=b;if(r.start=e,r.end=f,r.closestPointToPoint(d,!0,o).distanceTo(d)<=c||(r.start=e,r.end=g,r.closestPointToPoint(d,!0,o).distanceTo(d)<=c)||(r.start=f,r.end=g,r.closestPointToPoint(d,!0,o).distanceTo(d)<=c))return!0;let h=b.getPlane(q);if(Math.abs(h.distanceToPoint(d))<=c){let a=h.projectPoint(d,p);if(b.containsPoint(a))return!0}return!1});function aw(a){return 1e-15>Math.abs(a)}class ax extends as.Triangle{constructor(...a){super(...a),this.isExtendedTriangle=!0,this.satAxes=[,,,,].fill().map(()=>new as.Vector3),this.satBounds=[,,,,].fill().map(()=>new ar),this.points=[this.a,this.b,this.c],this.sphere=new as.Sphere,this.plane=new as.Plane,this.needsUpdate=!0}intersectsSphere(a){return av(a,this)}update(){let a=this.a,b=this.b,c=this.c,d=this.points,e=this.satAxes,f=this.satBounds,g=e[0],h=f[0];this.getNormal(g),h.setFromPoints(g,d);let i=e[1],j=f[1];i.subVectors(a,b),j.setFromPoints(i,d);let k=e[2],l=f[2];k.subVectors(b,c),l.setFromPoints(k,d);let m=e[3],n=f[3];m.subVectors(c,a),n.setFromPoints(m,d),this.sphere.setFromPoints(this.points),this.plane.setFromNormalAndCoplanarPoint(g,a),this.needsUpdate=!1}}ax.prototype.closestPointToSegment=(s=new as.Vector3,t=new as.Vector3,u=new as.Line3,function(a,b=null,c=null){let d,{start:e,end:f}=a,g=this.points,h=1/0;for(let e=0;e<3;e++){let f=(e+1)%3;u.start.copy(g[e]),u.end.copy(g[f]),au(u,a,s,t),(d=s.distanceToSquared(t))<h&&(h=d,b&&b.copy(s),c&&c.copy(t))}return this.closestPointToPoint(e,s),(d=e.distanceToSquared(s))<h&&(h=d,b&&b.copy(s),c&&c.copy(e)),this.closestPointToPoint(f,s),(d=f.distanceToSquared(s))<h&&(h=d,b&&b.copy(s),c&&c.copy(f)),Math.sqrt(h)}),ax.prototype.intersectsTriangle=function(){let a=new ax,b=[,,,],c=[,,,],d=new ar,e=new ar,f=new as.Vector3,g=new as.Vector3,h=new as.Vector3,i=new as.Vector3,j=new as.Vector3,k=new as.Line3,l=new as.Line3,m=new as.Line3,n=new as.Vector3;function o(a,b,c){let d=a.points,e=0,f=-1;for(let a=0;a<3;a++){let{start:h,end:i}=k;h.copy(d[a]),i.copy(d[(a+1)%3]),k.delta(g);let j=aw(b.distanceToPoint(h));if(aw(b.normal.dot(g))&&j){c.copy(k),e=2;break}let l=b.intersectLine(k,n);if(!l&&j&&n.copy(h),(l||j)&&!aw(n.distanceTo(i))){if(e<=1)(1===e?c.start:c.end).copy(n),j&&(f=e);else if(e>=2){(1===f?c.start:c.end).copy(n),e=2;break}if(2==++e&&-1===f)break}}return e}return function(g,k=null,n=!1){this.needsUpdate&&this.update(),g.isExtendedTriangle?g.needsUpdate&&g.update():(a.copy(g),a.update(),g=a);let p=this.plane,q=g.plane;if(Math.abs(p.normal.dot(q.normal))>1-1e-10){let a=this.satBounds,h=this.satAxes;c[0]=g.a,c[1]=g.b,c[2]=g.c;for(let b=0;b<4;b++){let e=a[b],f=h[b];if(d.setFromPoints(f,c),e.isSeparated(d))return!1}let i=g.satBounds,j=g.satAxes;b[0]=this.a,b[1]=this.b,b[2]=this.c;for(let a=0;a<4;a++){let c=i[a],e=j[a];if(d.setFromPoints(e,b),c.isSeparated(d))return!1}for(let a=0;a<4;a++){let g=h[a];for(let a=0;a<4;a++){let h=j[a];if(f.crossVectors(g,h),d.setFromPoints(f,b),e.setFromPoints(f,c),d.isSeparated(e))return!1}}return k&&(n||console.warn("ExtendedTriangle.intersectsTriangle: Triangles are coplanar which does not support an output edge. Setting edge to 0, 0, 0."),k.start.set(0,0,0),k.end.set(0,0,0)),!0}{let a=o(this,q,l);if(1===a&&g.containsPoint(l.end))return k&&(k.start.copy(l.end),k.end.copy(l.end)),!0;if(2!==a)return!1;let b=o(g,p,m);if(1===b&&this.containsPoint(m.end))return k&&(k.start.copy(m.end),k.end.copy(m.end)),!0;if(2!==b)return!1;if(l.delta(h),m.delta(i),0>h.dot(i)){let a=m.start;m.start=m.end,m.end=a}let c=l.start.dot(h),d=l.end.dot(h),e=m.start.dot(h),f=m.end.dot(h);return(c===f||e===d||d<e!=c<f)&&(k&&(j.subVectors(l.start,m.start),j.dot(h)>0?k.start.copy(l.start):k.start.copy(m.start),j.subVectors(l.end,m.end),0>j.dot(h)?k.end.copy(l.end):k.end.copy(m.end)),!0)}}}(),ax.prototype.distanceToPoint=(v=new as.Vector3,function(a){return this.closestPointToPoint(a,v),a.distanceTo(v)}),ax.prototype.distanceToTriangle=(w=new as.Vector3,x=new as.Vector3,y=["a","b","c"],z=new as.Line3,A=new as.Line3,function(a,b=null,c=null){let d=b||c?z:null;if(this.intersectsTriangle(a,d))return(b||c)&&(b&&d.getCenter(b),c&&d.getCenter(c)),0;let e=1/0;for(let d=0;d<3;d++){let f,g=y[d],h=a[g];this.closestPointToPoint(h,w),(f=h.distanceToSquared(w))<e&&(e=f,b&&b.copy(w),c&&c.copy(h));let i=this[g];a.closestPointToPoint(i,w),(f=i.distanceToSquared(w))<e&&(e=f,b&&b.copy(i),c&&c.copy(w))}for(let d=0;d<3;d++){let f=y[d],g=y[(d+1)%3];z.set(this[f],this[g]);for(let d=0;d<3;d++){let f=y[d],g=y[(d+1)%3];A.set(a[f],a[g]),au(z,A,w,x);let h=w.distanceToSquared(x);h<e&&(e=h,b&&b.copy(w),c&&c.copy(x))}}return Math.sqrt(e)});class ay{constructor(a,b,c){this.isOrientedBox=!0,this.min=new S.Vector3,this.max=new S.Vector3,this.matrix=new S.Matrix4,this.invMatrix=new S.Matrix4,this.points=Array(8).fill().map(()=>new S.Vector3),this.satAxes=[,,,].fill().map(()=>new S.Vector3),this.satBounds=[,,,].fill().map(()=>new ar),this.alignedSatBounds=[,,,].fill().map(()=>new ar),this.needsUpdate=!1,a&&this.min.copy(a),b&&this.max.copy(b),c&&this.matrix.copy(c)}set(a,b,c){this.min.copy(a),this.max.copy(b),this.matrix.copy(c),this.needsUpdate=!0}copy(a){this.min.copy(a.min),this.max.copy(a.max),this.matrix.copy(a.matrix),this.needsUpdate=!0}}ay.prototype.update=function(){let a=this.matrix,b=this.min,c=this.max,d=this.points;for(let e=0;e<=1;e++)for(let f=0;f<=1;f++)for(let g=0;g<=1;g++){let h=d[e|2*f|4*g];h.x=e?c.x:b.x,h.y=f?c.y:b.y,h.z=g?c.z:b.z,h.applyMatrix4(a)}let e=this.satBounds,f=this.satAxes,g=d[0];for(let a=0;a<3;a++){let b=f[a],c=e[a],h=d[1<<a];b.subVectors(g,h),c.setFromPoints(b,d)}let h=this.alignedSatBounds;h[0].setFromPointsField(d,"x"),h[1].setFromPointsField(d,"y"),h[2].setFromPointsField(d,"z"),this.invMatrix.copy(this.matrix).invert(),this.needsUpdate=!1},ay.prototype.intersectsBox=(B=new ar,function(a){this.needsUpdate&&this.update();let b=a.min,c=a.max,d=this.satBounds,e=this.satAxes,f=this.alignedSatBounds;if(B.min=b.x,B.max=c.x,f[0].isSeparated(B)||(B.min=b.y,B.max=c.y,f[1].isSeparated(B))||(B.min=b.z,B.max=c.z,f[2].isSeparated(B)))return!1;for(let b=0;b<3;b++){let c=e[b],f=d[b];if(B.setFromBox(c,a),f.isSeparated(B))return!1}return!0}),ay.prototype.intersectsTriangle=(C=new ax,D=[,,,],E=new ar,F=new ar,G=new S.Vector3,function(a){this.needsUpdate&&this.update(),a.isExtendedTriangle?a.needsUpdate&&a.update():(C.copy(a),C.update(),a=C);let b=this.satBounds,c=this.satAxes;D[0]=a.a,D[1]=a.b,D[2]=a.c;for(let a=0;a<3;a++){let d=b[a],e=c[a];if(E.setFromPoints(e,D),d.isSeparated(E))return!1}let d=a.satBounds,e=a.satAxes,f=this.points;for(let a=0;a<3;a++){let b=d[a],c=e[a];if(E.setFromPoints(c,f),b.isSeparated(E))return!1}for(let a=0;a<3;a++){let b=c[a];for(let a=0;a<4;a++){let c=e[a];if(G.crossVectors(b,c),E.setFromPoints(G,D),F.setFromPoints(G,f),E.isSeparated(F))return!1}}return!0}),ay.prototype.closestPointToPoint=function(a,b){return this.needsUpdate&&this.update(),b.copy(a).applyMatrix4(this.invMatrix).clamp(this.min,this.max).applyMatrix4(this.matrix),b},ay.prototype.distanceToPoint=(H=new S.Vector3,function(a){return this.closestPointToPoint(a,H),a.distanceTo(H)}),ay.prototype.distanceToBox=(I=["x","y","z"],J=Array(12).fill().map(()=>new S.Line3),K=Array(12).fill().map(()=>new S.Line3),L=new S.Vector3,M=new S.Vector3,function(a,b=0,c=null,d=null){if(this.needsUpdate&&this.update(),this.intersectsBox(a))return(c||d)&&(a.getCenter(M),this.closestPointToPoint(M,L),a.closestPointToPoint(L,M),c&&c.copy(L),d&&d.copy(M)),0;let e=b*b,f=a.min,g=a.max,h=this.points,i=1/0;for(let a=0;a<8;a++){let b=h[a];M.copy(b).clamp(f,g);let j=b.distanceToSquared(M);if(j<i&&(i=j,c&&c.copy(b),d&&d.copy(M),j<e))return Math.sqrt(j)}let j=0;for(let a=0;a<3;a++)for(let b=0;b<=1;b++)for(let c=0;c<=1;c++){let d=(a+1)%3,e=(a+2)%3,i=b<<d|c<<e,k=1<<a|b<<d|c<<e,l=h[i],m=h[k];J[j].set(l,m);let n=I[a],o=I[d],p=I[e],q=K[j],r=q.start,s=q.end;r[n]=f[n],r[o]=b?f[o]:g[o],r[p]=c?f[p]:g[o],s[n]=g[n],s[o]=b?f[o]:g[o],s[p]=c?f[p]:g[o],j++}for(let a=0;a<=1;a++)for(let b=0;b<=1;b++)for(let h=0;h<=1;h++){M.x=a?g.x:f.x,M.y=b?g.y:f.y,M.z=h?g.z:f.z,this.closestPointToPoint(M,L);let j=M.distanceToSquared(L);if(j<i&&(i=j,c&&c.copy(L),d&&d.copy(M),j<e))return Math.sqrt(j)}for(let a=0;a<12;a++){let b=J[a];for(let a=0;a<12;a++){au(b,K[a],L,M);let f=L.distanceToSquared(M);if(f<i&&(i=f,c&&c.copy(L),d&&d.copy(M),f<e))return Math.sqrt(f)}}return Math.sqrt(i)});class az{constructor(a){this._getNewPrimitive=a,this._primitives=[]}getPrimitive(){let a=this._primitives;return 0===a.length?this._getNewPrimitive():a.pop()}releasePrimitive(a){this._primitives.push(a)}}let aA=new class extends az{constructor(){super(()=>new ax)}},aB=new class{constructor(){this.float32Array=null,this.uint16Array=null,this.uint32Array=null;const a=[];let b=null;this.setBuffer=c=>{b&&a.push(b),b=c,this.float32Array=new Float32Array(c),this.uint16Array=new Uint16Array(c),this.uint32Array=new Uint32Array(c)},this.clearBuffer=()=>{b=null,this.float32Array=null,this.uint16Array=null,this.uint32Array=null,0!==a.length&&this.setBuffer(a.pop())}}},aC=[],aD=new az(()=>new S.Box3),aE=new S.Vector3,aF=new S.Vector3,aG=parseInt(S.REVISION)>=169,aH=new S.Vector3,aI=new S.Vector3,aJ=new S.Vector3,aK=new S.Vector2,aL=new S.Vector2,aM=new S.Vector2,aN=new S.Vector3,aO=new S.Vector3,aP=new S.Vector3,aQ=new S.Vector3;function aR(a,b,c,d,e,f,g){let h=3*d,i=h+0,j=h+1,k=h+2,l=a.index;a.index&&(i=l.getX(i),j=l.getX(j),k=l.getX(k));let{position:m,normal:n,uv:o,uv1:p}=a.attributes,q=function(a,b,c,d,e,f,g,h,i,j,k){aH.fromBufferAttribute(b,f),aI.fromBufferAttribute(b,g),aJ.fromBufferAttribute(b,h);let l=function(a,b,c,d,e,f,g,h){if(null===(f===S.BackSide?a.intersectTriangle(d,c,b,!0,e):a.intersectTriangle(b,c,d,f!==S.DoubleSide,e)))return null;let i=a.origin.distanceTo(e);return i<g||i>h?null:{distance:i,point:e.clone()}}(a,aH,aI,aJ,aQ,i,j,k);if(l){let b=new S.Vector3;S.Triangle.getBarycoord(aQ,aH,aI,aJ,b),d&&(aK.fromBufferAttribute(d,f),aL.fromBufferAttribute(d,g),aM.fromBufferAttribute(d,h),l.uv=S.Triangle.getInterpolation(aQ,aH,aI,aJ,aK,aL,aM,new S.Vector2)),e&&(aK.fromBufferAttribute(e,f),aL.fromBufferAttribute(e,g),aM.fromBufferAttribute(e,h),l.uv1=S.Triangle.getInterpolation(aQ,aH,aI,aJ,aK,aL,aM,new S.Vector2)),c&&(aN.fromBufferAttribute(c,f),aO.fromBufferAttribute(c,g),aP.fromBufferAttribute(c,h),l.normal=S.Triangle.getInterpolation(aQ,aH,aI,aJ,aN,aO,aP,new S.Vector3),l.normal.dot(a.direction)>0&&l.normal.multiplyScalar(-1));let i={a:f,b:g,c:h,normal:new S.Vector3,materialIndex:0};S.Triangle.getNormal(aH,aI,aJ,i.normal),l.face=i,l.faceIndex=f,aG&&(l.barycoord=b)}return l}(c,m,n,o,p,i,j,k,b,f,g);return q?(q.faceIndex=d,e&&e.push(q),q):null}function aS(a,b,c,d){let e=a.a,f=a.b,g=a.c,h=b,i=b+1,j=b+2;c&&(h=c.getX(h),i=c.getX(i),j=c.getX(j)),e.x=d.getX(h),e.y=d.getY(h),e.z=d.getZ(h),f.x=d.getX(i),f.y=d.getY(i),f.z=d.getZ(i),g.x=d.getX(j),g.y=d.getY(j),g.z=d.getZ(j)}function aT(a,b,c,d,e,f,g){let{geometry:h}=c,{index:i}=h,j=h.attributes.position;for(let c=a,h=b+a;c<h;c++){let a;if(aS(g,3*(a=c),i,j),g.needsUpdate=!0,d(g,a,e,f))return!0}return!1}function aU(a,b,c,d,e){let f,g,h,i,j,k,l=1/c.direction.x,m=1/c.direction.y,n=1/c.direction.z,o=c.origin.x,p=c.origin.y,q=c.origin.z,r=b[a],s=b[a+3],t=b[a+1],u=b[a+3+1],v=b[a+2],w=b[a+3+2];return l>=0?(f=(r-o)*l,g=(s-o)*l):(f=(s-o)*l,g=(r-o)*l),m>=0?(h=(t-p)*m,i=(u-p)*m):(h=(u-p)*m,i=(t-p)*m),!(f>i)&&!(h>g)&&((h>f||isNaN(f))&&(f=h),(i<g||isNaN(g))&&(g=i),n>=0?(j=(v-q)*n,k=(w-q)*n):(j=(w-q)*n,k=(v-q)*n),!(f>k)&&!(j>g)&&((j>f||f!=f)&&(f=j),(k<g||g!=g)&&(g=k),f<=e&&g>=d))}function aV(a,b,c,d,e,f,g){aB.setBuffer(a._roots[b]),function a(b,c,d,e,f,g,h){let{float32Array:i,uint16Array:j,uint32Array:k}=aB,l=2*b;if(Z(l,j))!function(a,b,c,d,e,f,g,h){let{geometry:i,_indirectBuffer:j}=a;for(let a=d,j=d+e;a<j;a++)aR(i,b,c,a,f,g,h)}(c,d,e,k[b+6],$(l,j),f,g,h);else{let j=b+8;aU(j,i,e,g,h)&&a(j,c,d,e,f,g,h);let l=k[b+6];aU(l,i,e,g,h)&&a(l,c,d,e,f,g,h)}}(0,a,c,d,e,f,g),aB.clearBuffer()}let aW=["x","y","z"];function aX(a,b,c,d,e,f){aB.setBuffer(a._roots[b]);let g=function a(b,c,d,e,f,g){let{float32Array:h,uint16Array:i,uint32Array:j}=aB,k=2*b;if(Z(k,i))return function(a,b,c,d,e,f,g){let{geometry:h,_indirectBuffer:i}=a,j=1/0,k=null;for(let a=d,i=d+e;a<i;a++){let d;(d=aR(h,b,c,a,null,f,g))&&d.distance<j&&(k=d,j=d.distance)}return k}(c,d,e,j[b+6],$(k,i),f,g);{let i,k,l=j[b+7],m=aW[l],n=e.direction[m]>=0;n?(i=b+8,k=j[b+6]):(i=j[b+6],k=b+8);let o=aU(i,h,e,f,g)?a(i,c,d,e,f,g):null;if(o){let a=o.point[m];if(n?a<=h[k+l]:a>=h[k+l+3])return o}let p=aU(k,h,e,f,g)?a(k,c,d,e,f,g):null;return o&&p?o.distance<=p.distance?o:p:o||p||null}}(0,a,c,d,e,f);return aB.clearBuffer(),g}let aY=new S.Box3,aZ=new ax,a$=new ax,a_=new S.Matrix4,a0=new ay,a1=new ay;function a2(a,b,c,d){aB.setBuffer(a._roots[b]);let e=function a(b,c,d,e,f=null){let{float32Array:g,uint16Array:h,uint32Array:i}=aB,j=2*b;if(null===f&&(d.boundingBox||d.computeBoundingBox(),a0.set(d.boundingBox.min,d.boundingBox.max,e),f=a0),Z(j,h)){let a=c.geometry,f=a.index,k=a.attributes.position,l=d.index,m=d.attributes.position,n=i[b+6],o=$(j,h);if(a_.copy(e).invert(),d.boundsTree)return ag(b,g,a1),a1.matrix.copy(a_),a1.needsUpdate=!0,d.boundsTree.shapecast({intersectsBounds:a=>a1.intersectsBox(a),intersectsTriangle:a=>{a.a.applyMatrix4(e),a.b.applyMatrix4(e),a.c.applyMatrix4(e),a.needsUpdate=!0;for(let b=3*n,c=(o+n)*3;b<c;b+=3)if(aS(a$,b,f,k),a$.needsUpdate=!0,a.intersectsTriangle(a$))return!0;return!1}});for(let a=3*n,b=(o+n)*3;a<b;a+=3){aS(aZ,a,f,k),aZ.a.applyMatrix4(a_),aZ.b.applyMatrix4(a_),aZ.c.applyMatrix4(a_),aZ.needsUpdate=!0;for(let a=0,b=l.count;a<b;a+=3)if(aS(a$,a,l,m),a$.needsUpdate=!0,aZ.intersectsTriangle(a$))return!0}}else{let h=b+8,j=i[b+6];return ag(h,g,aY),!!(f.intersectsBox(aY)&&a(h,c,d,e,f))||(ag(j,g,aY),!!(f.intersectsBox(aY)&&a(j,c,d,e,f)))}}(0,a,c,d);return aB.clearBuffer(),e}let a3=new S.Matrix4,a4=new ay,a5=new ay,a6=new S.Vector3,a7=new S.Vector3,a8=new S.Vector3,a9=new S.Vector3;function ba(a,b,c,d,e,f,g){let{geometry:h}=c,{index:i}=h,j=h.attributes.position;for(let h=a,k=b+a;h<k;h++){let a;if(aS(g,3*(a=c.resolveTriangleIndex(h)),i,j),g.needsUpdate=!0,d(g,a,e,f))return!0}return!1}function bb(a,b,c,d,e,f,g){aB.setBuffer(a._roots[b]),function a(b,c,d,e,f,g,h){let{float32Array:i,uint16Array:j,uint32Array:k}=aB,l=2*b;if(Z(l,j))!function(a,b,c,d,e,f,g,h){let{geometry:i,_indirectBuffer:j}=a;for(let a=d,k=d+e;a<k;a++)aR(i,b,c,j?j[a]:a,f,g,h)}(c,d,e,k[b+6],$(l,j),f,g,h);else{let j=b+8;aU(j,i,e,g,h)&&a(j,c,d,e,f,g,h);let l=k[b+6];aU(l,i,e,g,h)&&a(l,c,d,e,f,g,h)}}(0,a,c,d,e,f,g),aB.clearBuffer()}let bc=["x","y","z"];function bd(a,b,c,d,e,f){aB.setBuffer(a._roots[b]);let g=function a(b,c,d,e,f,g){let{float32Array:h,uint16Array:i,uint32Array:j}=aB,k=2*b;if(Z(k,i))return function(a,b,c,d,e,f,g){let{geometry:h,_indirectBuffer:i}=a,j=1/0,k=null;for(let a=d,l=d+e;a<l;a++){let d;(d=aR(h,b,c,i?i[a]:a,null,f,g))&&d.distance<j&&(k=d,j=d.distance)}return k}(c,d,e,j[b+6],$(k,i),f,g);{let i,k,l=j[b+7],m=bc[l],n=e.direction[m]>=0;n?(i=b+8,k=j[b+6]):(i=j[b+6],k=b+8);let o=aU(i,h,e,f,g)?a(i,c,d,e,f,g):null;if(o){let a=o.point[m];if(n?a<=h[k+l]:a>=h[k+l+3])return o}let p=aU(k,h,e,f,g)?a(k,c,d,e,f,g):null;return o&&p?o.distance<=p.distance?o:p:o||p||null}}(0,a,c,d,e,f);return aB.clearBuffer(),g}let be=new S.Box3,bf=new ax,bg=new ax,bh=new S.Matrix4,bi=new ay,bj=new ay;function bk(a,b,c,d){aB.setBuffer(a._roots[b]);let e=function a(b,c,d,e,f=null){let{float32Array:g,uint16Array:h,uint32Array:i}=aB,j=2*b;if(null===f&&(d.boundingBox||d.computeBoundingBox(),bi.set(d.boundingBox.min,d.boundingBox.max,e),f=bi),Z(j,h)){let a=c.geometry,f=a.index,k=a.attributes.position,l=d.index,m=d.attributes.position,n=i[b+6],o=$(j,h);if(bh.copy(e).invert(),d.boundsTree)return ag(b,g,bj),bj.matrix.copy(bh),bj.needsUpdate=!0,d.boundsTree.shapecast({intersectsBounds:a=>bj.intersectsBox(a),intersectsTriangle:a=>{a.a.applyMatrix4(e),a.b.applyMatrix4(e),a.c.applyMatrix4(e),a.needsUpdate=!0;for(let b=n,d=o+n;b<d;b++)if(aS(bg,3*c.resolveTriangleIndex(b),f,k),bg.needsUpdate=!0,a.intersectsTriangle(bg))return!0;return!1}});for(let a=n,b=o+n;a<b;a++){aS(bf,3*c.resolveTriangleIndex(a),f,k),bf.a.applyMatrix4(bh),bf.b.applyMatrix4(bh),bf.c.applyMatrix4(bh),bf.needsUpdate=!0;for(let a=0,b=l.count;a<b;a+=3)if(aS(bg,a,l,m),bg.needsUpdate=!0,bf.intersectsTriangle(bg))return!0}}else{let h=b+8,j=i[b+6];return ag(h,g,be),!!(f.intersectsBox(be)&&a(h,c,d,e,f))||(ag(j,g,be),!!(f.intersectsBox(be)&&a(j,c,d,e,f)))}}(0,a,c,d);return aB.clearBuffer(),e}let bl=new S.Matrix4,bm=new ay,bn=new ay,bo=new S.Vector3,bp=new S.Vector3,bq=new S.Vector3,br=new S.Vector3,bs=new aB.constructor,bt=new aB.constructor,bu=new az(()=>new S.Box3),bv=new S.Box3,bw=new S.Box3,bx=new S.Box3,by=new S.Box3,bz=!1,bA=new ay,bB=new S.Box3,bC={strategy:0,maxDepth:40,maxLeafTris:10,useSharedArrayBuffer:!1,setBoundingBox:!0,onProgress:null,indirect:!1,verbose:!0,range:null};class bD{static serialize(a,b={}){b={cloneBuffers:!0,...b};let c=a.geometry,d=a._roots,e=a._indirectBuffer,f=c.getIndex();return b.cloneBuffers?{roots:d.map(a=>a.slice()),index:f?f.array.slice():null,indirectBuffer:e?e.slice():null}:{roots:d,index:f?f.array:null,indirectBuffer:e}}static deserialize(a,b,c={}){c={setIndex:!0,indirect:!!a.indirectBuffer,...c};let{index:d,roots:e,indirectBuffer:f}=a,g=new bD(b,{...c,[Y]:!0});if(g._roots=e,g._indirectBuffer=f||null,c.setIndex){let c=b.getIndex();if(null===c){let c=new S.BufferAttribute(a.index,1,!1);b.setIndex(c)}else c.array!==d&&(c.array.set(d),c.needsUpdate=!0)}return g}get indirect(){return!!this._indirectBuffer}constructor(a,f={}){if(a.isBufferGeometry){if(a.index&&a.index.isInterleavedBufferAttribute)throw Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.")}else throw Error("MeshBVH: Only BufferGeometries are supported.");if((f=Object.assign({...bC,[Y]:!1},f)).useSharedArrayBuffer&&"undefined"==typeof SharedArrayBuffer)throw Error("MeshBVH: SharedArrayBuffer is not available.");this.geometry=a,this._roots=null,this._indirectBuffer=null,f[Y]||(!function(a,f){let g=a.geometry;if(f.indirect){var h;let b,c,d,e;a._indirectBuffer=function(a,b){let c=(a.index?a.index.count:a.attributes.position.count)/3,d=c>65536,e=d?4:2,f=b?new SharedArrayBuffer(c*e):new ArrayBuffer(c*e),g=d?new Uint32Array(f):new Uint16Array(f);for(let a=0,b=g.length;a<b;a++)g[a]=a;return g}(g,f.useSharedArrayBuffer),h=f.range,b=aa(g),(d=(c=ad(g,h).sort((a,b)=>a.offset-b.offset))[c.length-1]).count=Math.min(b-d.offset,d.count),e=0,c.forEach(({count:a})=>e+=a),b===e||f.verbose||console.warn('MeshBVH: Provided geometry contains groups or a range that do not fully span the vertex contents while using the "indirect" option. BVH may incorrectly report intersections on unrendered portions of the geometry.')}a._indirectBuffer||function(a,b){if(!a.index){let c=a.attributes.position.count,d=ab(c,b.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer);a.setIndex(new S.BufferAttribute(d,1));for(let a=0;a<c;a++)d[a]=a}}(g,f);let i=f.useSharedArrayBuffer?SharedArrayBuffer:ArrayBuffer,j=function(a,b=null,c=null,d=null){let e,f=a.attributes.position,g=a.index?a.index.array:null,h=aa(a),i=f.normalized;null===b?(e=new Float32Array(6*h),c=0,d=h):(e=b,c=c||0,d=d||h);let j=f.array,k=f.offset||0,l=3;f.isInterleavedBufferAttribute&&(l=f.data.stride);let m=["getX","getY","getZ"];for(let a=c;a<c+d;a++){let b=3*a,c=6*a,d=b+0,h=b+1,n=b+2;g&&(d=g[d],h=g[h],n=g[n]),i||(d=d*l+k,h=h*l+k,n=n*l+k);for(let a=0;a<3;a++){let b,g,k;i?(b=f[m[a]](d),g=f[m[a]](h),k=f[m[a]](n)):(b=j[d+a],g=j[h+a],k=j[n+a]);let l=b;g<l&&(l=g),k<l&&(l=k);let o=b;g>o&&(o=g),k>o&&(o=k);let p=(o-l)/2,q=2*a;e[c+q+0]=l+p,e[c+q+1]=p+(Math.abs(l)+p)*5960464477539063e-23}}return e}(g);a._roots=(f.indirect?ac(g,f.range):ad(g,f.range)).map(g=>{let h=function(a,b,c,d,e){let{maxDepth:f,verbose:g,maxLeafTris:h,strategy:i,onProgress:j,indirect:k}=e,l=a._indirectBuffer,m=a.geometry,n=m.index?m.index.array:null,o=k?aq:ap,p=aa(m),q=new Float32Array(6),r=!1,s=new ao;return af(b,c,d,s.boundingData,q),function a(c,d,e,j=null,k=0){if(!r&&k>=f&&(r=!0,g&&(console.warn(`MeshBVH: Max depth of ${f} reached when generating BVH. Consider increasing maxDepth.`),console.warn(m))),e<=h||k>=f)return t(d+e),c.offset=d,c.count=e,c;let p=function(a,b,c,d,e,f){let g=-1,h=0;if(0===f)-1!==(g=ah(b))&&(h=(b[g]+b[g+3])/2);else if(1===f)-1!==(g=ah(a))&&(h=function(a,b,c,d){let e=0;for(let f=b,g=b+c;f<g;f++)e+=a[6*f+2*d];return e/c}(c,d,e,g));else if(2===f){let f=ak(a),j=1.25*e,k=6*d,l=(d+e)*6;for(let a=0;a<3;a++){let d=b[a],m=(b[a+3]-d)/32;if(e<8){let b=[...am];b.length=e;let d=0;for(let e=k;e<l;e+=6,d++){let f=b[d];f.candidate=c[e+2*a],f.count=0;let{bounds:g,leftCacheBounds:h,rightCacheBounds:i}=f;for(let a=0;a<3;a++)i[a]=1/0,i[a+3]=-1/0,h[a]=1/0,h[a+3]=-1/0,g[a]=1/0,g[a+3]=-1/0;aj(e,c,g)}b.sort(al);let i=e;for(let a=0;a<i;a++){let c=b[a];for(;a+1<i&&b[a+1].candidate===c.candidate;)b.splice(a+1,1),i--}for(let d=k;d<l;d+=6){let e=c[d+2*a];for(let a=0;a<i;a++){let f=b[a];e>=f.candidate?aj(d,c,f.rightCacheBounds):(aj(d,c,f.leftCacheBounds),f.count++)}}for(let c=0;c<i;c++){let d=b[c],i=d.count,k=e-d.count,l=d.leftCacheBounds,m=d.rightCacheBounds,n=0;0!==i&&(n=ak(l)/f);let o=0;0!==k&&(o=ak(m)/f);let p=1+1.25*(n*i+o*k);p<j&&(g=a,j=p,h=d.candidate)}}else{var i;for(let a=0;a<32;a++){let b=am[a];b.count=0,b.candidate=d+m+a*m;let c=b.bounds;for(let a=0;a<3;a++)c[a]=1/0,c[a+3]=-1/0}for(let b=k;b<l;b+=6){let e=~~((c[b+2*a]-d)/m);e>=32&&(e=31);let f=am[e];f.count++,aj(b,c,f.bounds)}let b=am[31];i=b.bounds,b.rightCacheBounds.set(i);for(let a=30;a>=0;a--){let b=am[a],c=am[a+1];ai(b.bounds,c.rightCacheBounds,b.rightCacheBounds)}let n=0;for(let b=0;b<31;b++){let c=am[b],d=c.count,i=c.bounds,k=am[b+1].rightCacheBounds;0!==d&&(0===n?an.set(i):ai(i,an,an));let l=0,m=0;0!==(n+=d)&&(l=ak(an)/f);let o=e-n;0!==o&&(m=ak(k)/f);let p=1+1.25*(l*n+m*o);p<j&&(g=a,j=p,h=c.candidate)}}}}else console.warn(`MeshBVH: Invalid build strategy value ${f} used.`);return{axis:g,pos:h}}(c.boundingData,j,b,d,e,i);if(-1===p.axis)return t(d+e),c.offset=d,c.count=e,c;let s=o(l,n,b,d,e,p);if(s===d||s===d+e)t(d+e),c.offset=d,c.count=e;else{c.splitAxis=p.axis;let f=new ao,g=s-d;c.left=f,af(b,d,g,f.boundingData,q),a(f,d,g,q,k+1);let h=new ao,i=e-g;c.right=h,af(b,s,i,h.boundingData,q),a(h,s,i,q,k+1)}return c}(s,c,d,q),s;function t(a){j&&j(a/p)}}(a,j,g.offset,g.count,f),k=new i(32*function a(b){return"count"in b?1:1+a(b.left)+a(b.right)}(h));return b=new Float32Array(k),c=new Uint32Array(k),d=new Uint16Array(k),e=new Uint8Array(k),function a(f,g){let h=f/4,i=f/2,j="count"in g,k=g.boundingData;for(let a=0;a<6;a++)b[h+a]=k[a];if(j)if(g.buffer){let a=g.buffer;e.set(new Uint8Array(a),f);for(let b=f,e=f+a.byteLength;b<e;b+=32)Z(b/2,d)||(c[b/4+6]+=h);return f+a.byteLength}else{let a=g.offset,b=g.count;return c[h+6]=a,d[i+14]=b,d[i+15]=65535,f+32}{let b,d=g.left,e=g.right,i=g.splitAxis;if((b=a(f+32,d))/4>0x100000000)throw Error("MeshBVH: Cannot store child pointer greater than 32 bits.");return c[h+6]=b/4,b=a(b,e),c[h+7]=i,b}}(0,h),k})}(this,f),!a.boundingBox&&f.setBoundingBox&&(a.boundingBox=this.getBoundingBox(new S.Box3))),this.resolveTriangleIndex=f.indirect?a=>this._indirectBuffer[a]:a=>a}refit(a=null){return(this.indirect?function(a,b=null){let c,d,e,f;b&&Array.isArray(b)&&(b=new Set(b));let g=a.geometry,h=g.index?g.index.array:null,i=g.attributes.position,j=0,k=a._roots;for(let g=0,l=k.length;g<l;g++)d=new Uint32Array(c=k[g]),e=new Uint16Array(c),f=new Float32Array(c),function c(g,j,k=!1){let l=2*g;if(65535===e[l+15]){let b=d[g+6],c=e[l+14],j=1/0,k=1/0,m=1/0,n=-1/0,o=-1/0,p=-1/0;for(let d=b,e=b+c;d<e;d++){let b=3*a.resolveTriangleIndex(d);for(let a=0;a<3;a++){let c=b+a;c=h?h[c]:c;let d=i.getX(c),e=i.getY(c),f=i.getZ(c);d<j&&(j=d),d>n&&(n=d),e<k&&(k=e),e>o&&(o=e),f<m&&(m=f),f>p&&(p=f)}}return(f[g+0]!==j||f[g+1]!==k||f[g+2]!==m||f[g+3]!==n||f[g+4]!==o||f[g+5]!==p)&&(f[g+0]=j,f[g+1]=k,f[g+2]=m,f[g+3]=n,f[g+4]=o,f[g+5]=p,!0)}{let a=g+8,e=d[g+6],h=a+j,i=e+j,l=k,m=!1,n=!1;b?l||(m=b.has(h),n=b.has(i),l=!m&&!n):(m=!0,n=!0);let o=l||m,p=l||n,q=!1;o&&(q=c(a,j,l));let r=!1;p&&(r=c(e,j,l));let s=q||r;if(s)for(let b=0;b<3;b++){let c=a+b,d=e+b,h=f[c],i=f[c+3],j=f[d],k=f[d+3];f[g+b]=h<j?h:j,f[g+b+3]=i>k?i:k}return s}}(0,j),j+=c.byteLength}:function(a,b=null){let c,d,e,f;b&&Array.isArray(b)&&(b=new Set(b));let g=a.geometry,h=g.index?g.index.array:null,i=g.attributes.position,j=0,k=a._roots;for(let a=0,g=k.length;a<g;a++)d=new Uint32Array(c=k[a]),e=new Uint16Array(c),f=new Float32Array(c),function a(c,g,j=!1){let k=2*c;if(65535===e[k+15]){let a=d[c+6],b=e[k+14],g=1/0,j=1/0,l=1/0,m=-1/0,n=-1/0,o=-1/0;for(let c=3*a,d=3*(a+b);c<d;c++){let a=h[c],b=i.getX(a),d=i.getY(a),e=i.getZ(a);b<g&&(g=b),b>m&&(m=b),d<j&&(j=d),d>n&&(n=d),e<l&&(l=e),e>o&&(o=e)}return(f[c+0]!==g||f[c+1]!==j||f[c+2]!==l||f[c+3]!==m||f[c+4]!==n||f[c+5]!==o)&&(f[c+0]=g,f[c+1]=j,f[c+2]=l,f[c+3]=m,f[c+4]=n,f[c+5]=o,!0)}{let e=c+8,h=d[c+6],i=e+g,k=h+g,l=j,m=!1,n=!1;b?l||(m=b.has(i),n=b.has(k),l=!m&&!n):(m=!0,n=!0);let o=l||m,p=l||n,q=!1;o&&(q=a(e,g,l));let r=!1;p&&(r=a(h,g,l));let s=q||r;if(s)for(let a=0;a<3;a++){let b=e+a,d=h+a,g=f[b],i=f[b+3],j=f[d],k=f[d+3];f[c+a]=g<j?g:j,f[c+a+3]=i>k?i:k}return s}}(0,j),j+=c.byteLength})(this,a)}traverse(a,b=0){let c=this._roots[b],d=new Uint32Array(c),e=new Uint16Array(c);!function b(f,g=0){let h=2*f,i=65535===e[h+15];if(i){let b=d[f+6],j=e[h+14];a(g,i,new Float32Array(c,4*f,6),b,j)}else{let e=d[f+6],h=d[f+7];a(g,i,new Float32Array(c,4*f,6),h)||(b(f+8,g+1),b(e,g+1))}}(0)}raycast(a,b=S.FrontSide,c=0,d=1/0){let e=this._roots,f=this.geometry,g=[],h=b.isMaterial,i=Array.isArray(b),j=f.groups,k=h?b.side:b,l=this.indirect?bb:aV;for(let f=0,h=e.length;f<h;f++){let e=i?b[j[f].materialIndex].side:k,h=g.length;if(l(this,f,e,a,g,c,d),i){let a=j[f].materialIndex;for(let b=h,c=g.length;b<c;b++)g[b].face.materialIndex=a}}return g}raycastFirst(a,b=S.FrontSide,c=0,d=1/0){let e=this._roots,f=this.geometry,g=b.isMaterial,h=Array.isArray(b),i=null,j=f.groups,k=g?b.side:b,l=this.indirect?bd:aX;for(let f=0,g=e.length;f<g;f++){let e=h?b[j[f].materialIndex].side:k,g=l(this,f,e,a,c,d);null!=g&&(null==i||g.distance<i.distance)&&(i=g,h&&(g.face.materialIndex=j[f].materialIndex))}return i}intersectsGeometry(a,b){let c=!1,d=this._roots,e=this.indirect?bk:a2;for(let f=0,g=d.length;f<g&&!(c=e(this,f,a,b));f++);return c}shapecast(a){let b=aA.getPrimitive(),c=this.indirect?ba:aT,{boundsTraverseOrder:d,intersectsBounds:e,intersectsRange:h,intersectsTriangle:i}=a;if(h&&i){let a=h;h=(d,e,f,g,h)=>!!a(d,e,f,g,h)||c(d,e,this,i,f,g,b)}else h||(h=i?(a,d,e,f)=>c(a,d,this,i,e,f,b):(a,b,c)=>c);let j=!1,k=0,l=this._roots;for(let a=0,b=l.length;a<b;a++){let b=l[a];if(j=function(a,b,c,d,e,h){f=aD.getPrimitive(),g=aD.getPrimitive(),aC.push(f,g),aB.setBuffer(a._roots[b]);let i=function a(b,c,d,e,h=null,i=0,j=0){let{float32Array:k,uint16Array:l,uint32Array:m}=aB,n=2*b;if(Z(n,l)){let a=m[b+6],c=$(n,l);return ag(b,k,f),e(a,c,!1,j,i+b,f)}{let n,q,r,s,t,u,v=b+8,w=m[b+6],x=v,y=w;if(h&&(r=f,s=g,ag(x,k,r),ag(y,k,s),n=h(r),(q=h(s))<n)){x=w,y=v;let a=n;n=q,q=a,r=s}r||ag(x,k,r=f);let z=d(r,Z(2*x,l),n,j+1,i+x);if(2===z){let a=o(x);t=e(a,p(x)-a,!0,j+1,i+x,r)}else t=z&&a(x,c,d,e,h,i,j+1);if(t)return!0;ag(y,k,s=g);let A=d(s,Z(2*y,l),q,j+1,i+y);if(2===A){let a=o(y);u=e(a,p(y)-a,!0,j+1,i+y,s)}else u=A&&a(y,c,d,e,h,i,j+1);if(u)return!0;return!1;function o(a){let{uint16Array:b,uint32Array:c}=aB,d=2*a;for(;!Z(d,b);)d=2*(a+=8);return c[a+6]}function p(a){let{uint16Array:b,uint32Array:c}=aB,d=2*a;for(;!Z(d,b);)d=2*(a=c[a+6]);return c[a+6]+$(d,b)}}}(0,a.geometry,c,d,e,h);aB.clearBuffer(),aD.releasePrimitive(f),aD.releasePrimitive(g),aC.pop(),aC.pop();let j=aC.length;return j>0&&(g=aC[j-1],f=aC[j-2]),i}(this,a,e,h,d,k))break;k+=b.byteLength}return aA.releasePrimitive(b),j}bvhcast(a,b,c){let{intersectsRanges:d,intersectsTriangles:e}=c,f=aA.getPrimitive(),g=this.geometry.index,h=this.geometry.attributes.position,i=this.indirect?a=>{aS(f,3*this.resolveTriangleIndex(a),g,h)}:a=>{aS(f,3*a,g,h)},j=aA.getPrimitive(),k=a.geometry.index,l=a.geometry.attributes.position,m=a.indirect?b=>{aS(j,3*a.resolveTriangleIndex(b),k,l)}:a=>{aS(j,3*a,k,l)};if(e){let a=(a,c,d,g,h,k,l,n)=>{for(let o=d,p=d+g;o<p;o++){m(o),j.a.applyMatrix4(b),j.b.applyMatrix4(b),j.c.applyMatrix4(b),j.needsUpdate=!0;for(let b=a,d=a+c;b<d;b++)if(i(b),f.needsUpdate=!0,e(f,j,b,o,h,k,l,n))return!0}return!1};if(d){let b=d;d=function(c,d,e,f,g,h,i,j){return!!b(c,d,e,f,g,h,i,j)||a(c,d,e,f,g,h,i,j)}}else d=a}return function(a,b,c,d){let e;if(bz)throw Error("MeshBVH: Recursive calls to bvhcast not supported.");bz=!0;let f=a._roots,g=b._roots,h=0,i=0,j=new S.Matrix4().copy(c).invert();for(let a=0,b=f.length;a<b;a++){bs.setBuffer(f[a]),i=0;let b=bu.getPrimitive();ag(0,bs.float32Array,b),b.applyMatrix4(j);for(let a=0,f=g.length;a<f&&(bt.setBuffer(g[a]),e=function a(b,c,d,e,f,g=0,h=0,i=0,j=0,k=null,l=!1){let m,n;l?(m=bt,n=bs):(m=bs,n=bt);let o=m.float32Array,p=m.uint32Array,q=m.uint16Array,r=n.float32Array,s=n.uint32Array,t=n.uint16Array,u=2*c,v=Z(2*b,q),w=Z(u,t),x=!1;if(w&&v)x=l?f(s[c+6],$(2*c,t),p[b+6],$(2*b,q),j,h+c,i,g+b):f(p[b+6],$(2*b,q),s[c+6],$(2*c,t),i,g+b,j,h+c);else if(w){let k=bu.getPrimitive();ag(c,r,k),k.applyMatrix4(d);let m=b+8,n=p[b+6];ag(m,o,bv),ag(n,o,bw);let q=k.intersectsBox(bv),s=k.intersectsBox(bw);x=q&&a(c,m,e,d,f,h,g,j,i+1,k,!l)||s&&a(c,n,e,d,f,h,g,j,i+1,k,!l),bu.releasePrimitive(k)}else{let m=c+8,n=s[c+6];ag(m,r,bx),ag(n,r,by);let q=k.intersectsBox(bx),t=k.intersectsBox(by);if(q&&t)x=a(b,m,d,e,f,g,h,i,j+1,k,l)||a(b,n,d,e,f,g,h,i,j+1,k,l);else if(q)if(v)x=a(b,m,d,e,f,g,h,i,j+1,k,l);else{let c=bu.getPrimitive();c.copy(bx).applyMatrix4(d);let k=b+8,n=p[b+6];ag(k,o,bv),ag(n,o,bw);let q=c.intersectsBox(bv),r=c.intersectsBox(bw);x=q&&a(m,k,e,d,f,h,g,j,i+1,c,!l)||r&&a(m,n,e,d,f,h,g,j,i+1,c,!l),bu.releasePrimitive(c)}else if(t)if(v)x=a(b,n,d,e,f,g,h,i,j+1,k,l);else{let c=bu.getPrimitive();c.copy(by).applyMatrix4(d);let k=b+8,m=p[b+6];ag(k,o,bv),ag(m,o,bw);let q=c.intersectsBox(bv),r=c.intersectsBox(bw);x=q&&a(n,k,e,d,f,h,g,j,i+1,c,!l)||r&&a(n,m,e,d,f,h,g,j,i+1,c,!l),bu.releasePrimitive(c)}}return x}(0,0,c,j,d,h,i,0,0,b),bt.clearBuffer(),i+=g[a].length,!e);a++);if(bu.releasePrimitive(b),bs.clearBuffer(),h+=f[a].length,e)break}return bz=!1,e}(this,a,b,d)}intersectsBox(a,b){return bA.set(a.min,a.max,b),bA.needsUpdate=!0,this.shapecast({intersectsBounds:a=>bA.intersectsBox(a),intersectsTriangle:a=>bA.intersectsTriangle(a)})}intersectsSphere(a){return this.shapecast({intersectsBounds:b=>a.intersectsBox(b),intersectsTriangle:b=>b.intersectsSphere(a)})}closestPointToGeometry(a,b,c={},d={},e=0,f=1/0){return(this.indirect?function(a,b,c,d={},e={},f=0,g=1/0){b.boundingBox||b.computeBoundingBox(),bm.set(b.boundingBox.min,b.boundingBox.max,c),bm.needsUpdate=!0;let h=a.geometry,i=h.attributes.position,j=h.index,k=b.attributes.position,l=b.index,m=aA.getPrimitive(),n=aA.getPrimitive(),o=null,p=null;e&&(o=bq,p=br);let q=1/0,r=null,s=null;return(bl.copy(c).invert(),bn.matrix.copy(bl),a.shapecast({boundsTraverseOrder:a=>bm.distanceToBox(a),intersectsBounds:(a,b,c)=>c<q&&c<g&&(b&&(bn.min.copy(a.min),bn.max.copy(a.max),bn.needsUpdate=!0),!0),intersectsRange:(d,e)=>{if(b.boundsTree){let h=b.boundsTree;return h.shapecast({boundsTraverseOrder:a=>bn.distanceToBox(a),intersectsBounds:(a,b,c)=>c<q&&c<g,intersectsRange:(b,g)=>{for(let t=b,u=b+g;t<u;t++){aS(n,3*h.resolveTriangleIndex(t),l,k),n.a.applyMatrix4(c),n.b.applyMatrix4(c),n.c.applyMatrix4(c),n.needsUpdate=!0;for(let b=d,c=d+e;b<c;b++){aS(m,3*a.resolveTriangleIndex(b),j,i),m.needsUpdate=!0;let c=m.distanceToTriangle(n,bo,o);if(c<q&&(bp.copy(bo),p&&p.copy(o),q=c,r=b,s=t),c<f)return!0}}}})}{let g=aa(b);for(let b=0;b<g;b++){aS(n,3*b,l,k),n.a.applyMatrix4(c),n.b.applyMatrix4(c),n.c.applyMatrix4(c),n.needsUpdate=!0;for(let c=d,g=d+e;c<g;c++){aS(m,3*a.resolveTriangleIndex(c),j,i),m.needsUpdate=!0;let d=m.distanceToTriangle(n,bo,o);if(d<q&&(bp.copy(bo),p&&p.copy(o),q=d,r=c,s=b),d<f)return!0}}}}}),aA.releasePrimitive(m),aA.releasePrimitive(n),q===1/0)?null:(d.point?d.point.copy(bp):d.point=bp.clone(),d.distance=q,d.faceIndex=r,e&&(e.point?e.point.copy(p):e.point=p.clone(),e.point.applyMatrix4(bl),bp.applyMatrix4(bl),e.distance=bp.sub(e.point).length(),e.faceIndex=s),d)}:function(a,b,c,d={},e={},f=0,g=1/0){b.boundingBox||b.computeBoundingBox(),a4.set(b.boundingBox.min,b.boundingBox.max,c),a4.needsUpdate=!0;let h=a.geometry,i=h.attributes.position,j=h.index,k=b.attributes.position,l=b.index,m=aA.getPrimitive(),n=aA.getPrimitive(),o=null,p=null;e&&(o=a8,p=a9);let q=1/0,r=null,s=null;return(a3.copy(c).invert(),a5.matrix.copy(a3),a.shapecast({boundsTraverseOrder:a=>a4.distanceToBox(a),intersectsBounds:(a,b,c)=>c<q&&c<g&&(b&&(a5.min.copy(a.min),a5.max.copy(a.max),a5.needsUpdate=!0),!0),intersectsRange:(a,d)=>{if(b.boundsTree)return b.boundsTree.shapecast({boundsTraverseOrder:a=>a5.distanceToBox(a),intersectsBounds:(a,b,c)=>c<q&&c<g,intersectsRange:(b,e)=>{for(let g=b,h=b+e;g<h;g++){aS(n,3*g,l,k),n.a.applyMatrix4(c),n.b.applyMatrix4(c),n.c.applyMatrix4(c),n.needsUpdate=!0;for(let b=a,c=a+d;b<c;b++){aS(m,3*b,j,i),m.needsUpdate=!0;let a=m.distanceToTriangle(n,a6,o);if(a<q&&(a7.copy(a6),p&&p.copy(o),q=a,r=b,s=g),a<f)return!0}}}});{let e=aa(b);for(let b=0;b<e;b++){aS(n,3*b,l,k),n.a.applyMatrix4(c),n.b.applyMatrix4(c),n.c.applyMatrix4(c),n.needsUpdate=!0;for(let c=a,e=a+d;c<e;c++){aS(m,3*c,j,i),m.needsUpdate=!0;let a=m.distanceToTriangle(n,a6,o);if(a<q&&(a7.copy(a6),p&&p.copy(o),q=a,r=c,s=b),a<f)return!0}}}}}),aA.releasePrimitive(m),aA.releasePrimitive(n),q===1/0)?null:(d.point?d.point.copy(a7):d.point=a7.clone(),d.distance=q,d.faceIndex=r,e&&(e.point?e.point.copy(p):e.point=p.clone(),e.point.applyMatrix4(a3),a7.applyMatrix4(a3),e.distance=a7.sub(e.point).length(),e.faceIndex=s),d)})(this,a,b,c,d,e,f)}closestPointToPoint(a,b={},c=0,d=1/0){return function(a,b,c={},d=0,e=1/0){let f=d*d,g=e*e,h=1/0,i=null;if(a.shapecast({boundsTraverseOrder:a=>(aE.copy(b).clamp(a.min,a.max),aE.distanceToSquared(b)),intersectsBounds:(a,b,c)=>c<h&&c<g,intersectsTriangle:(a,c)=>{a.closestPointToPoint(b,aE);let d=b.distanceToSquared(aE);return d<h&&(aF.copy(aE),h=d,i=c),d<f}}),h===1/0)return null;let j=Math.sqrt(h);return c.point?c.point.copy(aF):c.point=aF.clone(),c.distance=j,c.faceIndex=i,c}(this,a,b,c,d)}getBoundingBox(a){return a.makeEmpty(),this._roots.forEach(b=>{ag(0,new Float32Array(b),bB),a.union(bB)}),a}}var bE=a.i(30081);let bF=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,bG=`

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
`,bH=`

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
`,bI=`
	${bG}
	${bH}
`;var bJ=a.i(15924);let bK=(0,bE.shaderMaterial)({envMap:null,bounces:3,ior:2.4,correctMips:!0,aberrationStrength:.01,fresnel:0,bvh:new ae,color:new S.Color("white"),opacity:1,resolution:new S.Vector2,viewMatrixInverse:new S.Matrix4,projectionMatrixInverse:new S.Matrix4},`
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
  ${bF}
  ${bI}
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
    #include <${bJ.version>=154?"colorspace_fragment":"encodings_fragment"}>
  }`);function bL({aberrationStrength:a=0,fastChroma:b=!0,envMap:c,...d}){(0,P.extend)({MeshRefractionMaterial:bK});let e=(0,O.useRef)(null),{size:f}=(0,Q.useThree)(),g=(0,O.useMemo)(()=>{var d,e;let f={},g=c&&c.isCubeTexture,h=Math.floor(Math.log2((null!=(d=g?null==(e=c.image[0])?void 0:e.width:c.image.width)?d:1024)/4)),i=Math.pow(2,h),j=3*Math.max(i,112);return g&&(f.ENVMAP_TYPE_CUBEM=""),f.CUBEUV_TEXEL_WIDTH=`${1/j}`,f.CUBEUV_TEXEL_HEIGHT=`${1/(4*i)}`,f.CUBEUV_MAX_MIP=`${h}.0`,a>0&&(f.CHROMATIC_ABERRATIONS=""),b&&(f.FAST_CHROMA=""),f},[a,b]);return(0,O.useLayoutEffect)(()=>{var a;let b=null==(a=e.current)||null==(a=a.__r3f)||null==(a=a.parent)||null==(a=a.object)?void 0:a.geometry;b&&(e.current.bvh=new ae,e.current.bvh.updateFrom(new bD(b.clone().toNonIndexed(),{strategy:2})))},[]),(0,R.useFrame)(({camera:a})=>{e.current.viewMatrixInverse=a.matrixWorld,e.current.projectionMatrixInverse=a.projectionMatrixInverse}),O.createElement("meshRefractionMaterial",(0,N.default)({key:JSON.stringify(g),defines:g,ref:e,resolution:[f.width,f.height],aberrationStrength:a,envMap:c},d))}a.s(["MeshRefractionMaterial",()=>bL],20678)}];

//# sourceMappingURL=6e8f0_%40react-three_drei_core_MeshRefractionMaterial_55dc9c42.js.map