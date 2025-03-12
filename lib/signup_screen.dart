// import 'package:flutter/material.dart';
// import 'login_screen.dart';

// class SignupScreen extends StatefulWidget {
//   const SignupScreen({Key? key}) : super(key: key);

//   @override
//   _SignupScreenState createState() => _SignupScreenState();
// }

// class _SignupScreenState extends State<SignupScreen> {
//   bool _obscurePassword = true;
//   bool _agreeTerms = false;

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: Colors.white,
//       body: Center(
//         child: Padding(
//           padding: const EdgeInsets.symmetric(horizontal: 20),
//           child: Column(
//             mainAxisAlignment: MainAxisAlignment.center,
//             children: [
//               const Text(
//                 "Sign Up",
//                 style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold,color: Colors.black),
//               ),
//               const SizedBox(height: 20),
//               Row(
//                 children: [
//                   Expanded(
//                     child: TextField(
//                       decoration: InputDecoration(
//                         hintText: "First Name",
//                         border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
//                       ),
//                     ),
//                   ),
//                   const SizedBox(width: 10),
//                   Expanded(
//                     child: TextField(
//                       decoration: InputDecoration(
//                         hintText: "Last Name",
//                         border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
//                       ),
//                     ),
//                   ),
//                 ],
//               ),
//               const SizedBox(height: 15),
//               TextField(
//                 decoration: InputDecoration(
//                   hintText: "Email",
//                   prefixIcon: const Icon(Icons.email, color: Colors.black),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
//                 ),
//               ),
//               const SizedBox(height: 15),
//               TextField(
//                 obscureText: _obscurePassword,
//                 decoration: InputDecoration(
//                   hintText: "Password",
//                   prefixIcon: const Icon(Icons.lock, color: Colors.black),
//                   suffixIcon: IconButton(
//                     icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility, color: Colors.black),
//                     onPressed: () {
//                       setState(() {
//                         _obscurePassword = !_obscurePassword;
//                       });
//                     },
//                   ),
//                   border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
//                 ),
//               ),
//               const SizedBox(height: 15),
//               Row(
//                 children: [
//                   Checkbox(
//                     value: _agreeTerms,
//                     onChanged: (value) {
//                       setState(() {
//                         _agreeTerms = value!;
//                       });
//                     },
//                   ),
//                   const Text("I Agree with ", style: TextStyle(color: Colors.black)),
//                   const Text("privacy and policy", style: TextStyle(color: Colors.black)),
//                 ],
//               ),
//               const SizedBox(height: 10),
//               ElevatedButton(
//                 style: ElevatedButton.styleFrom(
//                 backgroundColor: const Color.fromARGB(255, 26, 217, 26),
//                   padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
//                   shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
//                 ),
//                 onPressed: () {},
//                 child: const Text("Sign Up", style: TextStyle(fontSize: 18,color:Color.fromARGB(255, 0, 0, 0))),
//               ),
//               const SizedBox(height: 20),
//               GestureDetector(
//                 onTap: () {
//                   Navigator.pop(context);
//                 },
//                 child: const Text("Already have an account? Sign in", style: TextStyle(color: Colors.black)),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
// }

import 'package:flutter/material.dart';
import 'login_screen.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  bool _obscurePassword = true;
  bool _agreeTerms = false;
  String _selectedDepartment = "Health Department";

  final List<String> departments = [
    "Health Department",
    "General Department",
    "Engineering Department",
    "Revenue Department"
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                "Sign Up",
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.black),
              ),
              const SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  hintText: "Full Name",
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                decoration: InputDecoration(
                  hintText: "Email",
                  prefixIcon: const Icon(Icons.email, color: Colors.black),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 15),
              TextField(
                obscureText: _obscurePassword,
                decoration: InputDecoration(
                  hintText: "Password",
                  prefixIcon: const Icon(Icons.lock, color: Colors.black),
                  suffixIcon: IconButton(
                    icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility, color: Colors.black),
                    onPressed: () {
                      setState(() {
                        _obscurePassword = !_obscurePassword;
                      });
                    },
                  ),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
              ),
              const SizedBox(height: 15),
              DropdownButtonFormField(
                decoration: InputDecoration(
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(20)),
                ),
                value: _selectedDepartment,
                items: departments.map((String department) {
                  return DropdownMenuItem(
                    value: department,
                    child: Text(department),
                  );
                }).toList(),
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedDepartment = newValue!;
                  });
                },
              ),
              const SizedBox(height: 15),
              Row(
                children: [
                  Checkbox(
                    value: _agreeTerms,
                    onChanged: (value) {
                      setState(() {
                        _agreeTerms = value!;
                      });
                    },
                  ),
                  const Text("I Agree with privacy and policy", style: TextStyle(color: Colors.black)),
                ],
              ),
              const SizedBox(height: 10),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.green,
                  padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 15),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                ),
                onPressed: () {},
                child: const Text("Sign Up", style: TextStyle(fontSize: 18, color: Colors.white)),
              ),
              const SizedBox(height: 20),

              /// **Login Button**
              TextButton(
                onPressed: () {
                  // Navigate to LoginScreen when clicked
                  Navigator.push(context, MaterialPageRoute(builder: (context) => const LoginScreen()));
                },
                child: const Text("Already have an account? Login", style: TextStyle(color: Colors.black)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
