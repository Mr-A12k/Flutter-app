import 'package:flutter/material.dart';
import 'activity_screen.dart'; // Ensure this file exists

void main() {
  runApp(GovVerApp());
}

class GovVerApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Gov Ver.',
      theme: ThemeData(primarySwatch: Colors.blue),
      home: DashboardScreen(),
    );
  }
}

class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    if (index == 1) {
      // Navigate to Activity Screen when "Activity" is tapped
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ActivityScreen()),
      );
    } else {
      // Update the selected index for other tabs
      setState(() {
        _selectedIndex = index;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          'Gov Ver.',
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.card_giftcard, color: Colors.black),
            onPressed: () {},
          ),
          IconButton(
            icon: const Icon(Icons.notifications, color: Colors.black),
            onPressed: () {},
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            _buildSummaryCard(),
            const SizedBox(height: 20),
            _buildFunctionRow(),
            const SizedBox(height: 20),
            _buildInspectionLogs(),
          ],
        ),
      ),
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: Colors.blue,
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'HOME'),
          BottomNavigationBarItem(icon: Icon(Icons.map), label: 'ACTIVITY'), // Navigates to ActivityScreen
          BottomNavigationBarItem(icon: Icon(Icons.insert_drive_file), label: 'SUGGESTIONS'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'PROFILE'),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: Colors.blue,
        onPressed: () {},
        child: const Icon(Icons.fingerprint, color: Colors.white),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }

  Widget _buildSummaryCard() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue,
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Total Inspections: 125',
            style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 5),
          Text(
            'Completed: 85 | Pending: 40',
            style: TextStyle(color: Colors.white70, fontSize: 16),
          ),
        ],
      ),
    );
  }

  Widget _buildFunctionRow() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _buildFunctionButton(Icons.location_on, 'Check-in'),
        _buildFunctionButton(Icons.photo_camera, 'Upload Photos'),
        _buildFunctionButton(Icons.rate_review, 'Review Work'),
        _buildFunctionButton(Icons.more_horiz, 'More'),
      ],
    );
  }

  Widget _buildFunctionButton(IconData icon, String label) {
    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: Colors.white,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(color: Colors.grey.shade300, blurRadius: 4, spreadRadius: 2)
            ],
          ),
          child: Icon(icon, color: Colors.blue),
        ),
        const SizedBox(height: 5),
        Text(label, style: const TextStyle(fontSize: 14))
      ],
    );
  }

  Widget _buildInspectionLogs() {
    return Expanded(
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Inspection Logs',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              TextButton(onPressed: () {}, child: const Text('See All'))
            ],
          ),
          Expanded(
            child: ListView(
              children: [
                _buildLogItem('Public Toilet Inspection - Reviewed', 'Today 1:53 PM'),
                _buildLogItem('Garbage Collection Vehicle Checked', 'Today 2:33 PM'),
                _buildLogItem('Water Quality Report Submitted', 'Today 3:32 PM'),
                _buildLogItem('Sanitation Drive - Geo-Tagged', 'Jan 15, 5:15 AM'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLogItem(String title, String time) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 6),
      child: ListTile(
        leading: const Icon(Icons.check_circle, color: Colors.green),
        title: Text(title),
        subtitle: Text(time),
      ),
    );
  }
}
