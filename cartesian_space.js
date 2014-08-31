module.exports = function(){
  return {
      createPoint:function(x_c,y_c,z_c){
          var point = {xCoord:x_c,yCoord:y_c,zCoord:z_c};
          return point;
      },
      calculateDistanceBetweenTwoPoints:function(point1,point2){
          var distance = Math.pow(Math.pow(point1.xCoord-point2.xCoord,2)+Math.pow(point1.yCoord-point2.yCoord,2)+Math.pow(point1.zCoord-point2.zCoord,2),0.5);
          return distance;
      }
  }
}
