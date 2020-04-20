let nodes = [];
let width = 500;
let nodeA, nodeB, nodeC, nodeD, nodeE, nodeF;
let highlightNodes = [];
let algorithmSteps, distanceFromATable, pathTable, visited;
let visitedNodes = [];
let steps = [];
let stepCounter = 0;

function setNodes(){
    nodeA = { value: 'A', x: 100, y: 50, currentTotalWeight: 0, cameFrom: null };
    nodeB = { value: 'B', x: 300, y: 70, currentTotalWeight: Infinity, cameFrom: null };
    nodeC = { value: 'C', x: 50, y: 250, currentTotalWeight: Infinity, cameFrom: null };
    nodeD = { value: 'D', x: 300, y: 300, currentTotalWeight: Infinity, cameFrom: null };
    nodeE = { value: 'E', x: 500, y: 300, currentTotalWeight: Infinity, cameFrom: null };
    nodeF = { value: 'F', x: 250, y: 500, currentTotalWeight: Infinity, cameFrom: null };
    
    nodes = [];
    nodes.push(nodeA, nodeB, nodeC, nodeD, nodeE, nodeF);
}

function setup() {
    steps = [addFirstStep, addSecondStep, addThirdStep, addFourthStep, addFifthStep, addSixthStep,
            addSeventhStep, addEighthStep, addNinthStep, addTenthStep, addEleventhStep, addTwelthStep,
            addThirteenthStep, addFourteenthStep, addFifteenthStep, addSixteenthStep, addSeventeenthStep,
            addEighteenthStep, addNineteenthStep, addTwentihStep, addTwentyFirstStep];
    setNodes();

    // frameRate(10);
    createCanvas(1280, 650);
    textSize(32);
    textAlign(CENTER, CENTER);

    resetButton = createButton('RESET');
    resetButton.addClass('btn btn-primary');
    resetButton.position(810, 600);
    resetButton.mousePressed(reset);

    nextButton = createButton('NEXT');
    nextButton.addClass('btn btn-primary');
    nextButton.position(910, 600);
    nextButton.mousePressed(next);

    createStepsTable();

    var context = createElement('h3', 'Context');
    algorithmSteps.child(context);

    var about_dijkstra = createElement('h4', '<a href=\'https://en.wikipedia.org/wiki/Edsger_W._Dijkstra\'>Edsger W. Dijkstra</a> was one of the pioneer\'s in the field of computer science. ' +
        'His work led to new fields within computer science, such as distrubuted systems and parallel multithreading. Shortest path algorithm is one his inventions.' +
        '<br><br>Follow the trail by clicking on the NEXT button, to understand how the algorithm works.' + 
        '<br><br>Pre-requisites knowledge of following is recommended - <br>1. Graph data structure<br>2. Adjacency list<br>3. Graph traversal');
    about_dijkstra.addClass('white');
    algorithmSteps.child(about_dijkstra);

    createDistanceTable();

    createPathTable();

    visited = createP('Visited nodes: ' + visitedNodes);
    visited.addClass('white');
    visited.position(600, 150);
}

function createStepsTable() {
    algorithmSteps = createDiv('');
    algorithmSteps.addClass('steps');
    algorithmSteps.position(810, 80);
    var header = createElement('h2', 'Algorithm steps');
    algorithmSteps.child(header);
}

function createPathTable() {
    pathTable = createDiv('');
    pathTable.addClass('small');
    pathTable.position(600, 410);
    var pathHeader = createElement('h4', 'Path table');
    pathHeader.addClass('white');
    pathTable.child(pathHeader);
}

function createDistanceTable() {
    distanceFromATable = createDiv('');
    distanceFromATable.addClass('small');
    distanceFromATable.position(600, 200);
    var distanceHeader = createElement('h4', 'Distance from A');
    distanceHeader.addClass('white');
    distanceFromATable.child(distanceHeader);
}

function draw() {
    background('#566573');
    noStroke();

    drawEdges(nodeA, nodeB, 4);
    drawEdges(nodeA, nodeC, 2);
    drawEdges(nodeC, nodeD, 2);
    drawEdges(nodeD, nodeF, 1);
    drawEdges(nodeD, nodeE, 3);
    drawEdges(nodeB, nodeE, 3);
    drawEdges(nodeC, nodeF, 4);
    drawEdges(nodeF, nodeE, 1);
    
    if(stepCounter === 21){
        highlightPath();
    }

    drawNodes();
    highlight(highlightNodes);
}

function reset() {
    highlightIndex = 0;
    algorithmSteps.remove();
    distanceFromATable.remove();
    pathTable.remove();
    visited.html('Visited nodes: ');
    visitedNodes = [];
    steps = [];
    highlightNodes = [];
    stepCounter = 0;
    setup();
}

function next() {
    if (stepCounter < steps.length) {
        steps[stepCounter]();
        stepCounter++;
    }
}

function addFirstStep() {
    addStep('Step 1', 'Consider a weighted graph as shown. <br><br>Let\'s say we want to find the shortest path between node A and E. As you can see there are already quite a few ways to reach E from A.')
    highlightNodes.push(nodeA);
    highlightNodes.push(nodeE);
}

function addSecondStep() {
    addStep('Step 2', 'We have to start from the source node, (which in this case is A). It is clear that we need to visit nodes, in a particular sequence to reach our destination (which in this case is E). And our job is to find a path in which the total sum of weights is the lease.');
}

function addThirdStep() {
    addStep('Step 3', 'We will maintain 3 structures. Let\'s discuss them one by one. <br><br> The table \'Distance from A\' denotes the total distance of each node from our starting point. Distance from A to A is 0, since it\'s the same point. Rest all we initialize to Infinity, since we dont know the distances yet.<br><br> The path table represents the node from which we visited each node. We will fill this table as we find the best path.<br><br> In the beginning, we\'ll initialize all the nodes to null.');
    
    updateDistanceTable();
    updatePathTable();
}

function addFourthStep(){
    addStep('Step 4', 'Now a couple of important rules. <br><br>1. We will always pick the unvisited node with least total distance, from our \'Distance from A\' table, to process next. <br><br>2. If the total calculated distance in the current iteration, is less than the existing total distance for any node, we update it with the lesser found distance. <br><br>Right now the node with least weight is A (Rule 1). So we\'ll pick that now. <br><br>Node A, has 2 neighbors - B and C. We will visit all neighbors one by one. <br><br> Lets visit B first. Distance from A to B is 4, so we update it in the \'Distance from A\' table. Also we reached B from A, so we update that in the path table.')
    
    highlightNodes = [];
    highlightNodes.push(nodeA);
    highlightNodes.push(nodeB);

    nodeB.currentTotalWeight = 4;
    nodeB.cameFrom = 'A';
    
    updateDistanceTable();
    updatePathTable();
}

function addFifthStep(){
    addStep('Step 5', 'Now lets visit C. Distance from A to C is 2. So, we update that. And also the path to C.')
    
    highlightNodes = [];
    highlightNodes.push(nodeA);
    highlightNodes.push(nodeC);
    
    nodeC.currentTotalWeight = 2;
    nodeC.cameFrom = 'A';

    updateDistanceTable();
    updatePathTable();
}

function addSixthStep(){
    addStep('Step 6', 'We have now visited all the neigbours of A. So, we\'ll add it to the VISITED array.')
    
    highlightNodes = [];
    highlightNodes.push(nodeA);
    highlightNodes.push(nodeC);
    highlightNodes.push(nodeB);

    visitedNodes.push('A');
    visited.html('Visited nodes: ' + visitedNodes);
}

function addSeventhStep(){
    addStep('Step 7', 'Next up we\'ll repeat our rule to pick the next node to process. And the rule is pick the unvisited node with lowest weight from \'Distance from A\' table. We will not pick A, since it is in VISITED state. So next lowest is C (Rule 1). So we\'ll pick C next.')
    highlightNodes = [];
    highlightNodes.push(nodeC);
}

function addEighthStep(){
    addStep('Step 8', 'Now we will repeat the same process, visit all neighbors of C. <br><br> Lets visit D first');

    highlightNodes = [];
    highlightNodes.push(nodeC);
    highlightNodes.push(nodeD);
}

function addNinthStep(){
    addStep('Step 9', 'Now when we visit D, the total distance from A <br>= existing distance till C + distance from C to D <br>= 2 + 2 <br>= 4. <br> So we update that in our table. And we reached D through C, so we update that in path table.');

    highlightNodes = [];
    highlightNodes.push(nodeC);
    highlightNodes.push(nodeD);

    nodeD.currentTotalWeight = 4;
    nodeD.cameFrom = 'C';

    updateDistanceTable();
    updatePathTable();
}

function addTenthStep(){
    addStep('Step 10', 'We visit next neighbor of C, which is F. Total distance to F <br>= distance till C + distance from C to F <br>= 2 + 4 <br>= 6. <br> . We also update that we reached F from C, in the path table.');

    highlightNodes = [];
    highlightNodes.push(nodeC);
    highlightNodes.push(nodeF);

    nodeF.currentTotalWeight = 6;
    nodeF.cameFrom = 'C';

    updateDistanceTable();
    updatePathTable();
}

function addEleventhStep(){
    addStep('Step 11', 'Now, all neighbors of C are visited, so we add C to the VISITED array.');

    highlightNodes = [];
    highlightNodes.push(nodeC);
    highlightNodes.push(nodeD);
    highlightNodes.push(nodeF);

    visitedNodes.push('C');
    visited.html('Visited nodes: ' + visitedNodes);
}

function addTwelthStep(){
    addStep('Step 12', 'Ok. Now time to select our next node to process. We\'ve already processed A and C, so wo won\'t select them now. <br><br>B and D have the next least weights, i.e. 4. If we go alphabetically, let\'s pick B to process next (Rule 1). ')

    highlightNodes = [];
    highlightNodes.push(nodeB);
}

function addThirteenthStep(){
    addStep('Step 13', 'B has only one unvisted neighbor, i.e. E. So we visit that, and update the total distance to E, which is 4 + 3 = 7. We also update the path of how we reached till E.');

    highlightNodes = [];
    highlightNodes.push(nodeB);
    highlightNodes.push(nodeE);

    nodeE.currentTotalWeight = 7;
    nodeE.cameFrom = 'B';

    updateDistanceTable();
    updatePathTable();
}

function addFourteenthStep(){
    addStep('Step 14', 'All neighbors of B are done, so we add B to VISITED array.')

    highlightNodes = [];
    highlightNodes.push(nodeB);

    visitedNodes.push('B');
    visited.html('Visited nodes: ' + visitedNodes);
}

function addFifteenthStep(){
    addStep('Step 15', 'Ok, time to run our Rule 1 and select the next node to process. Next least unvisited node is D. So we pick that.')

    highlightNodes = [];
    highlightNodes.push(nodeD);
}

function addSixteenthStep(){
    addStep('Step 16', 'D has 2 neighbors, E and F. So we visit E first. Now, when we calculate the total distance till E <br>= total distance till D + distance between D and E <br>= 4 + 3 <br>= 7. <br><br> This is equal to current total distance at E. SO WE DONT UPDATE IT. (Rule 2)');

    highlightNodes = [];
    highlightNodes.push(nodeD);
    highlightNodes.push(nodeE);
}

function addSeventeenthStep(){
    addStep('Step 17', 'Lets visit the next neighbor of D, which is F. Now, total distance till F <br>= total distance till D + distance between D and F <br>= 4 + 1 <br>= 5. Wow, we found a short path. 5 is less than current value at F, which is 6. So we UPDATE THE TOTAL DISTANCE AT F (Rule 2). <br><br>Also, we update our path table to indicate where we came from for this shorter route.')

    highlightNodes = [];
    highlightNodes.push(nodeD);
    highlightNodes.push(nodeF);

    nodeF.currentTotalWeight = 5;
    nodeF.cameFrom = 'D';

    updateDistanceTable();
    updatePathTable();
}

function addEighteenthStep(){
    addStep('Step 18', 'Now we have visited all neighbors of D, so we add it to VISITED array.');

    highlightNodes = [];
    highlightNodes.push(nodeD);
    
    visitedNodes.push('D');
    visited.html('Visited nodes: ' + visitedNodes);
}

function addNineteenthStep(){
    addStep('Step 19', 'Lets pick our next least unvisted node to process. It is now F with value 5. So we pick that.');

    highlightNodes = [];
    highlightNodes.push(nodeF);
}

function addTwentihStep(){
    addStep('Step 20', 'Node F has only 1 unvisted neighbor, i.e. E. Total distance till E <br>= total distance till F + distance betwen F and E <br>= 5 + 1 <br>= 6. 6 is smaller than 7, so we have found a shorter route(Rule 2). <br>We update in DISTANCE and ROUTE table.')

    highlightNodes = [];
    highlightNodes.push(nodeF);
    highlightNodes.push(nodeE);

    nodeE.currentTotalWeight = 6;
    nodeE.cameFrom = 'F';

    updateDistanceTable();
    updatePathTable();
}

function addTwentyFirstStep(){
    addStep('Step 21', 'We have visited all neighbors of F, so we add it to VISITED array. At this point, only node left to be processed is E, which is also our destination. So we stop here and we\'re done. <br><br>Important things to notice here is that each node in our PATH table has shortest path from A.<br><br> How to read the path table?<br> In the path table, we\'ve updated how we reached that node. <br><br>How we reached E, from F. <br>How we reached F, from D.<br>How we reached D, from C.<br>How we reached C, from A.');

    highlightNodes = [];
    highlightNodes.push(nodeA);
    highlightNodes.push(nodeC);
    highlightNodes.push(nodeD);
    highlightNodes.push(nodeF);
    highlightNodes.push(nodeE);
    
    visitedNodes.push('F');
    visited.html('Visited nodes: ' + visitedNodes);

    var done = createElement('h2', 'We\'re done..!!');
    done.addClass('white');
    algorithmSteps.child(done);

    var enjoy = createElement('h4', 'I hope you enjoyed it as much as I did...');
    enjoy.addClass('white');
    algorithmSteps.child(enjoy);
}

function updatePathTable() {
    pathTable.remove();
    createPathTable();
    nodes.forEach(node => {
        var path = createElement('h5', node.value + ' : ' + node.cameFrom);
        path.addClass('green');
        pathTable.child(path);
    });
}

function updateDistanceTable() {
    distanceFromATable.remove();
    createDistanceTable();
    nodes.forEach(node => {
        var currentNode = createElement('h5', node.value + ' : ' + node.currentTotalWeight);
        currentNode.addClass('green');
        distanceFromATable.child(currentNode);
    });
}

function addStep(stepId, text) {
    algorithmSteps.remove();
    createStepsTable();

    var entryStep = createElement('h3', stepId);
    var entryText = createElement('h4', text);
    entryText.addClass('white');
    algorithmSteps.child(entryStep);
    algorithmSteps.child(entryText);
}

function drawNodes() {
    for (let i = 0; i < nodes.length; i++) {
        drawNode(nodes[i]);
    }
}

function drawNode(node) {
    fill(255);
    ellipse(node.x, node.y, 50);
    fill(0);
    text(node.value, node.x, node.y);
}

function highlight() {
    highlightNodes.forEach(node => {
        fill('#32CD32');
        ellipse(node.x, node.y, 50);
        fill(0);
        text(node.value, node.x, node.y);
    });
}

function drawEdges(node1, node2, weight) {
    drawLine(node1, node2);
    drawWeight(node1, node2, weight);
}

function drawWeight(node1, node2, weight) {
    let offset = 15;
    strokeWeight(1);
    textSize(18);
    let weightX;
    if (node1.value === 'C' && node2.value === 'F')
        weightX = ((node1.x + node2.x) / 2);
    else
        weightX = ((node1.x + node2.x) / 2) + offset;
    let weightY;
    if (node1.value === 'B' && node2.value === 'E')
        weightY = ((node1.y + node2.y) / 2);
    else
        weightY = ((node1.y + node2.y) / 2) + offset;
    text(weight, weightX, weightY);
    textSize(32);
}

function drawLine(node1, node2, thickness = 2, color = 255) {
    stroke(color);
    strokeWeight(thickness);
    fill(color);
    line(node1.x, node1.y, node2.x, node2.y);
}

function highlightPath(){
    drawLine(nodeA, nodeC, 5, '#32CD32');
    drawLine(nodeC, nodeD, 5, '#32CD32');
    drawLine(nodeD, nodeF, 5, '#32CD32');
    drawLine(nodeF, nodeE, 5, '#32CD32');
    
    fill(255);
    stroke(255);
    strokeWeight(2);
}
