import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class PageMe extends StatefulWidget {
  @override
  _PageMeState createState() => _PageMeState();
}

class _PageMeState extends State<PageMe> {
  getListView() {
    return ListView.builder(
        itemCount: 10,
        itemBuilder: (BuildContext context, int index) {
          if (index == 0) {
            return Container(
              height: 100,
              child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                      width: 50,
                      height: 50,
                      color: Colors.red,
                      child: Text('123'),
                    );
                  }),
            );
          }
          return Container(
            height: 40,
            child: Text('item $index'),
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: getListView(),
    );
  }
}
