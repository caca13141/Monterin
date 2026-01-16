import * as THREE from "three";

export function getBrilliantCutGeometry(): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    // Approximate measurements for a Round Brilliant Cut
    // Crown (top)
    const crownHeight = 0.3;
    const tableRadius = 0.6;
    const girdleRadius = 1.0;

    // Pavilion (bottom)
    const pavilionHeight = 1.0;
    const culetRadius = 0.05; // Small flat bottom or point

    // Segments (Higher = smoother, but we want facets)
    const radialSegments = 32; // Increased for higher fidelity

    // Vertices array
    const vertices: number[] = [];
    const indices: number[] = [];

    // Helper to add vertex
    const addVertex = (x: number, y: number, z: number) => {
        vertices.push(x, y, z);
        return (vertices.length / 3) - 1;
    };

    // --- VERTEX GENERATION ---

    // 0: Top Center (Table)
    const tableCenterIndex = addVertex(0, crownHeight, 0);

    // Table Ring (Top flat surface edge)
    const tableIndices: number[] = [];
    for (let i = 0; i < radialSegments; i++) {
        const angle = (i / radialSegments) * Math.PI * 2;
        tableIndices.push(addVertex(
            Math.cos(angle) * tableRadius,
            crownHeight,
            Math.sin(angle) * tableRadius
        ));
    }

    // Girdle Ring (Widest part)
    const girdleIndices: number[] = [];
    for (let i = 0; i < radialSegments; i++) {
        const angle = (i / radialSegments) * Math.PI * 2;
        // Offset slightly to create triangular facets
        // const offsetAngle = angle + (Math.PI / radialSegments) * 0.5; 
        girdleIndices.push(addVertex(
            Math.cos(angle) * girdleRadius,
            0,
            Math.sin(angle) * girdleRadius
        ));
    }

    // Culet (Bottom point)
    const culetIndex = addVertex(0, -pavilionHeight, 0);

    // --- FACE GENERATION ---

    // 1. Table (Top Flat Face as a fan of triangles)
    for (let i = 0; i < radialSegments; i++) {
        const next = (i + 1) % radialSegments;
        // Center -> Current -> Next
        indices.push(tableCenterIndex, tableIndices[i], tableIndices[next]);
    }

    // 2. Crown Facets (Between Table and Girdle)
    // This is a simple loft. For true brilliant, we'd need star facets + bezel facets + upper girdle facets.
    // We'll simplify to just quads (2 triangles) connecting the rings for now, 
    // but to make it look "brilliant", we should stagger them or stick to simple cone-like segments
    // Let's do simple connections for the base model.
    for (let i = 0; i < radialSegments; i++) {
        const next = (i + 1) % radialSegments;
        // Quad: Table[i], Girdle[i], Girdle[next], Table[next]
        // Tri 1
        indices.push(tableIndices[i], girdleIndices[i], tableIndices[next]);
        // Tri 2
        indices.push(tableIndices[next], girdleIndices[i], girdleIndices[next]);
    }

    // 3. Pavilion Facets (Between Girdle and Culet)
    for (let i = 0; i < radialSegments; i++) {
        const next = (i + 1) % radialSegments;
        // Triangle: Girdle[i], Culet, Girdle[next]
        indices.push(girdleIndices[i], culetIndex, girdleIndices[next]);
    }

    // Set attributes
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
}
